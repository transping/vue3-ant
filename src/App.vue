<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

import {iso, Newtype} from 'newtype-ts'
import {PositiveInteger} from 'newtype-ts/lib/PositiveInteger'

interface FirstName extends Newtype<{ readonly FirstName: unique symbol }, string> {}
interface LastName extends Newtype<{ readonly LastName: unique symbol }, string> {}
const firstNameIso = iso<FirstName>()
const lastNameIso = iso<LastName>()

type User = {
  firstName: FirstName,
  lastName: LastName,
  age: PositiveInteger,
  gender: Gender,
  region: Region
}

type UserRegistrationDto = {
  firstName: string,
  lastName: string,
  age: number,
  sex: string,
  country: string
}

type Gender = 'M' | 'F' | 'X'
type Europe = {
  readonly _type: 'Europe'
}
type NorthAmerica = {
  readonly _type: 'NorthAmerica'
}

type Other = {
  readonly _type: 'Other'
}

type Region = Europe | NorthAmerica | Other



function canHaveABeer(user: User) {
  return user.gender === 'M'
}

type AltString = string
function printAlt(alt: AltString) {
  console.log(alt)
}
const aString: string = 'a string'
printAlt(aString)


</script>

<template>
  <a-config-provider :locale="zhCN">
    <img alt="Vue logo" src="/imgs/logo.png" />
    <router-view></router-view>
  </a-config-provider>
</template>
