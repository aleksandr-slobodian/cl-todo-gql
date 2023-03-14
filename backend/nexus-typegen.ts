/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./api/context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Date";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  TodoOrderByInput: { // input type
    createdAt?: NexusGenEnums['Sort'] | null; // Sort
    isDone?: NexusGenEnums['Sort'] | null; // Sort
    title?: NexusGenEnums['Sort'] | null; // Sort
    updatedAt?: NexusGenEnums['Sort'] | null; // Sort
  }
}

export interface NexusGenEnums {
  Sort: "asc" | "desc"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Date: Date
  DateTime: Date
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: {};
  Query: {};
  Todo: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id: number; // Int!
    isDone?: boolean | null; // Boolean
    title?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    userId?: number | null; // Int
  }
  TodoFeed: { // root type
    count?: number | null; // Int
    id?: string | null; // ID
    todos: NexusGenRootTypes['Todo'][]; // [Todo!]!
  }
  User: { // root type
    createdAt?: NexusGenScalars['Date'] | null; // Date
    id: number; // Int!
    name: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: { // field return type
    addTodo: NexusGenRootTypes['Todo']; // Todo!
    deleteTodo: NexusGenRootTypes['Todo']; // Todo!
    login: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    signup: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    updateTodo: NexusGenRootTypes['Todo']; // Todo!
  }
  Query: { // field return type
    feed: NexusGenRootTypes['TodoFeed']; // TodoFeed!
  }
  Todo: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: number; // Int!
    isDone: boolean | null; // Boolean
    title: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    userId: number | null; // Int
  }
  TodoFeed: { // field return type
    count: number | null; // Int
    id: string | null; // ID
    todos: NexusGenRootTypes['Todo'][]; // [Todo!]!
  }
  User: { // field return type
    createdAt: NexusGenScalars['Date'] | null; // Date
    id: number; // Int!
    name: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    token: 'String'
    user: 'User'
  }
  Mutation: { // field return type name
    addTodo: 'Todo'
    deleteTodo: 'Todo'
    login: 'AuthPayload'
    signup: 'AuthPayload'
    updateTodo: 'Todo'
  }
  Query: { // field return type name
    feed: 'TodoFeed'
  }
  Todo: { // field return type name
    createdAt: 'DateTime'
    id: 'Int'
    isDone: 'Boolean'
    title: 'String'
    updatedAt: 'DateTime'
    userId: 'Int'
  }
  TodoFeed: { // field return type name
    count: 'Int'
    id: 'ID'
    todos: 'Todo'
  }
  User: { // field return type name
    createdAt: 'Date'
    id: 'Int'
    name: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addTodo: { // args
      title: string; // String!
    }
    deleteTodo: { // args
      todoId: number; // Int!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    signup: { // args
      email: string; // String!
      name: string; // String!
      password: string; // String!
    }
    updateTodo: { // args
      isDone: boolean; // Boolean!
      title: string; // String!
      todoId: number; // Int!
    }
  }
  Query: {
    feed: { // args
      filter?: string | null; // String
      orderBy?: NexusGenInputs['TodoOrderByInput'][] | null; // [TodoOrderByInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}