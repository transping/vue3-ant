<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import { TableColumnType, TableProps } from 'ant-design-vue'
  import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue'
  import { usePagination } from 'vue-request'
  import Repo from '../repo'

  type APIParams = {
    results: number;
    page?: number;
    sort_field?: string;
    sort_order?: number;
    [key: string]: any;
  };
  type DataItems = {
    id: number;
    name: string;
    username: string;
  }
  type APIResult = {
    results: DataItems[];
  }

  const queryData = (params: APIParams) => {
    return Repo.get<APIResult>('/users', { params })
  }

  const {
    data: dataSource,
    run,
    loading,
    current,
    pageSize,
  } = usePagination(queryData, {
    formatResult: res => res.data.results,
    pagination: {
      currentKey: 'page',
      pageSizeKey: 'page_size',
    },
  })

  const pagination = computed(() => ({
    total: 200,
    current: current.value,
    pageSize: pageSize.value,
  }))

  const columns: TableColumnType<DataItems>[] = [
    {
      title: '#',
      key: 'index',
      width: 60,
      align: 'center',
    },
    {
      title: '表单名称',
      dataIndex: 'name',
    },
    {
      title: '表单类型',
      dataIndex: 'age',
    },
    {
      title: '操作时间',
      dataIndex: 'address',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
    },
    {
      title: '操作',
      key: 'action',
    },
  ]

  const handleTableChange: TableProps<DataItems>['onChange'] = (
    pagination,
    filters: any,
    sorter: any,
  ) => {
    run({
      results: pagination.pageSize!,
      page: pagination?.current,
      sort_field: sorter.field,
      sort_order: sorter.order,
      ...filters,
    })
  }

  onMounted(() => {
    
  })
</script>

<template>
  <h1 class="text-3xl font-bold underline">
    Hello {{ $route.params.name }}!
    
  </h1>
  <a-table
    bordered
    :columns="columns"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange">
    <template #headerCell="{ title, column }">
      <template v-if="column.dataIndex === 'name'">
        <span>
          <smile-outlined />
          {{ title }}
        </span>
      </template>
    </template>

    <template #bodyCell="{text, record, index, column}">
      <template v-if="column.key === 'index'">
        {{ index + 1 }}
      </template>
      <template v-if="column.dataIndex === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.dataIndex === 'tags'">
        <span>
          <a-tag
            v-for="tag in record.tags"
            :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>Invite 一 {{ record.name }}</a>
          <a-divider type="vertical" />
          <a>Delete</a>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link">
            More actions
            <down-outlined />
          </a>
        </span>
      </template>
    </template>
  </a-table>
</template>
