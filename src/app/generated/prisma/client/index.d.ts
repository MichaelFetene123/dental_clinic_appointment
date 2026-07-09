
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model EmployeeProfile
 * 
 */
export type EmployeeProfile = $Result.DefaultSelection<Prisma.$EmployeeProfilePayload>
/**
 * Model PatientProfile
 * 
 */
export type PatientProfile = $Result.DefaultSelection<Prisma.$PatientProfilePayload>
/**
 * Model Appointment
 * 
 */
export type Appointment = $Result.DefaultSelection<Prisma.$AppointmentPayload>
/**
 * Model DentalHistory
 * 
 */
export type DentalHistory = $Result.DefaultSelection<Prisma.$DentalHistoryPayload>
/**
 * Model MedicalDocument
 * 
 */
export type MedicalDocument = $Result.DefaultSelection<Prisma.$MedicalDocumentPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  DOCTOR: 'DOCTOR',
  PATIENT: 'PATIENT',
  RECEPTIONIST: 'RECEPTIONIST'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Gender: {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const BloodType: {
  A_PLUS: 'A_PLUS',
  A_MINUS: 'A_MINUS',
  B_PLUS: 'B_PLUS',
  B_MINUS: 'B_MINUS',
  O_PLUS: 'O_PLUS',
  O_MINUS: 'O_MINUS',
  AB_PLUS: 'AB_PLUS',
  AB_MINUS: 'AB_MINUS',
  UNKNOWN: 'UNKNOWN'
};

export type BloodType = (typeof BloodType)[keyof typeof BloodType]


export const GumCondition: {
  HEALTHY: 'HEALTHY',
  GINGIVITIS: 'GINGIVITIS',
  PERIODONTITIS: 'PERIODONTITIS'
};

export type GumCondition = (typeof GumCondition)[keyof typeof GumCondition]


export const AppointmentStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type AppointmentStatus = (typeof AppointmentStatus)[keyof typeof AppointmentStatus]


export const TreatmentStatus: {
  SCHEDULED: 'SCHEDULED',
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED'
};

export type TreatmentStatus = (typeof TreatmentStatus)[keyof typeof TreatmentStatus]


export const PaymentStatus: {
  PENDING: 'PENDING',
  PAID: 'PAID'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type BloodType = $Enums.BloodType

export const BloodType: typeof $Enums.BloodType

export type GumCondition = $Enums.GumCondition

export const GumCondition: typeof $Enums.GumCondition

export type AppointmentStatus = $Enums.AppointmentStatus

export const AppointmentStatus: typeof $Enums.AppointmentStatus

export type TreatmentStatus = $Enums.TreatmentStatus

export const TreatmentStatus: typeof $Enums.TreatmentStatus

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employeeProfile`: Exposes CRUD operations for the **EmployeeProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmployeeProfiles
    * const employeeProfiles = await prisma.employeeProfile.findMany()
    * ```
    */
  get employeeProfile(): Prisma.EmployeeProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patientProfile`: Exposes CRUD operations for the **PatientProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PatientProfiles
    * const patientProfiles = await prisma.patientProfile.findMany()
    * ```
    */
  get patientProfile(): Prisma.PatientProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Appointments
    * const appointments = await prisma.appointment.findMany()
    * ```
    */
  get appointment(): Prisma.AppointmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dentalHistory`: Exposes CRUD operations for the **DentalHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DentalHistories
    * const dentalHistories = await prisma.dentalHistory.findMany()
    * ```
    */
  get dentalHistory(): Prisma.DentalHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.medicalDocument`: Exposes CRUD operations for the **MedicalDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MedicalDocuments
    * const medicalDocuments = await prisma.medicalDocument.findMany()
    * ```
    */
  get medicalDocument(): Prisma.MedicalDocumentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    EmployeeProfile: 'EmployeeProfile',
    PatientProfile: 'PatientProfile',
    Appointment: 'Appointment',
    DentalHistory: 'DentalHistory',
    MedicalDocument: 'MedicalDocument'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "employeeProfile" | "patientProfile" | "appointment" | "dentalHistory" | "medicalDocument"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      EmployeeProfile: {
        payload: Prisma.$EmployeeProfilePayload<ExtArgs>
        fields: Prisma.EmployeeProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeProfilePayload>
          }
          findFirst: {
            args: Prisma.EmployeeProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeProfilePayload>
          }
          findMany: {
            args: Prisma.EmployeeProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeProfilePayload>[]
          }
          create: {
            args: Prisma.EmployeeProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeProfilePayload>
          }
          createMany: {
            args: Prisma.EmployeeProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployeeProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeProfilePayload>[]
          }
          delete: {
            args: Prisma.EmployeeProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeProfilePayload>
          }
          update: {
            args: Prisma.EmployeeProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeProfilePayload>
          }
          deleteMany: {
            args: Prisma.EmployeeProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmployeeProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeProfilePayload>[]
          }
          upsert: {
            args: Prisma.EmployeeProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeProfilePayload>
          }
          aggregate: {
            args: Prisma.EmployeeProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployeeProfile>
          }
          groupBy: {
            args: Prisma.EmployeeProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeProfileCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeProfileCountAggregateOutputType> | number
          }
        }
      }
      PatientProfile: {
        payload: Prisma.$PatientProfilePayload<ExtArgs>
        fields: Prisma.PatientProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientProfilePayload>
          }
          findFirst: {
            args: Prisma.PatientProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientProfilePayload>
          }
          findMany: {
            args: Prisma.PatientProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientProfilePayload>[]
          }
          create: {
            args: Prisma.PatientProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientProfilePayload>
          }
          createMany: {
            args: Prisma.PatientProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatientProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientProfilePayload>[]
          }
          delete: {
            args: Prisma.PatientProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientProfilePayload>
          }
          update: {
            args: Prisma.PatientProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientProfilePayload>
          }
          deleteMany: {
            args: Prisma.PatientProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PatientProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientProfilePayload>[]
          }
          upsert: {
            args: Prisma.PatientProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientProfilePayload>
          }
          aggregate: {
            args: Prisma.PatientProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatientProfile>
          }
          groupBy: {
            args: Prisma.PatientProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientProfileCountArgs<ExtArgs>
            result: $Utils.Optional<PatientProfileCountAggregateOutputType> | number
          }
        }
      }
      Appointment: {
        payload: Prisma.$AppointmentPayload<ExtArgs>
        fields: Prisma.AppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findFirst: {
            args: Prisma.AppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findMany: {
            args: Prisma.AppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          create: {
            args: Prisma.AppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          createMany: {
            args: Prisma.AppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppointmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          delete: {
            args: Prisma.AppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          update: {
            args: Prisma.AppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppointmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          upsert: {
            args: Prisma.AppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          aggregate: {
            args: Prisma.AppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointment>
          }
          groupBy: {
            args: Prisma.AppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentCountAggregateOutputType> | number
          }
        }
      }
      DentalHistory: {
        payload: Prisma.$DentalHistoryPayload<ExtArgs>
        fields: Prisma.DentalHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DentalHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DentalHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DentalHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DentalHistoryPayload>
          }
          findFirst: {
            args: Prisma.DentalHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DentalHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DentalHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DentalHistoryPayload>
          }
          findMany: {
            args: Prisma.DentalHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DentalHistoryPayload>[]
          }
          create: {
            args: Prisma.DentalHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DentalHistoryPayload>
          }
          createMany: {
            args: Prisma.DentalHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DentalHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DentalHistoryPayload>[]
          }
          delete: {
            args: Prisma.DentalHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DentalHistoryPayload>
          }
          update: {
            args: Prisma.DentalHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DentalHistoryPayload>
          }
          deleteMany: {
            args: Prisma.DentalHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DentalHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DentalHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DentalHistoryPayload>[]
          }
          upsert: {
            args: Prisma.DentalHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DentalHistoryPayload>
          }
          aggregate: {
            args: Prisma.DentalHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDentalHistory>
          }
          groupBy: {
            args: Prisma.DentalHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<DentalHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.DentalHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<DentalHistoryCountAggregateOutputType> | number
          }
        }
      }
      MedicalDocument: {
        payload: Prisma.$MedicalDocumentPayload<ExtArgs>
        fields: Prisma.MedicalDocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MedicalDocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalDocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MedicalDocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalDocumentPayload>
          }
          findFirst: {
            args: Prisma.MedicalDocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalDocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MedicalDocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalDocumentPayload>
          }
          findMany: {
            args: Prisma.MedicalDocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalDocumentPayload>[]
          }
          create: {
            args: Prisma.MedicalDocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalDocumentPayload>
          }
          createMany: {
            args: Prisma.MedicalDocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MedicalDocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalDocumentPayload>[]
          }
          delete: {
            args: Prisma.MedicalDocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalDocumentPayload>
          }
          update: {
            args: Prisma.MedicalDocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalDocumentPayload>
          }
          deleteMany: {
            args: Prisma.MedicalDocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MedicalDocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MedicalDocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalDocumentPayload>[]
          }
          upsert: {
            args: Prisma.MedicalDocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalDocumentPayload>
          }
          aggregate: {
            args: Prisma.MedicalDocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedicalDocument>
          }
          groupBy: {
            args: Prisma.MedicalDocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<MedicalDocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.MedicalDocumentCountArgs<ExtArgs>
            result: $Utils.Optional<MedicalDocumentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    employeeProfile?: EmployeeProfileOmit
    patientProfile?: PatientProfileOmit
    appointment?: AppointmentOmit
    dentalHistory?: DentalHistoryOmit
    medicalDocument?: MedicalDocumentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    doctorAppointments: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctorAppointments?: boolean | UserCountOutputTypeCountDoctorAppointmentsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDoctorAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }


  /**
   * Count Type PatientProfileCountOutputType
   */

  export type PatientProfileCountOutputType = {
    appointments: number
    dentalHistory: number
    medicalDocuments: number
  }

  export type PatientProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointments?: boolean | PatientProfileCountOutputTypeCountAppointmentsArgs
    dentalHistory?: boolean | PatientProfileCountOutputTypeCountDentalHistoryArgs
    medicalDocuments?: boolean | PatientProfileCountOutputTypeCountMedicalDocumentsArgs
  }

  // Custom InputTypes
  /**
   * PatientProfileCountOutputType without action
   */
  export type PatientProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientProfileCountOutputType
     */
    select?: PatientProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PatientProfileCountOutputType without action
   */
  export type PatientProfileCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * PatientProfileCountOutputType without action
   */
  export type PatientProfileCountOutputTypeCountDentalHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DentalHistoryWhereInput
  }

  /**
   * PatientProfileCountOutputType without action
   */
  export type PatientProfileCountOutputTypeCountMedicalDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicalDocumentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    phone: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    phone: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    phone: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    phone?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    phone?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    phone?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string
    phone: string | null
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    phone?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientProfile?: boolean | User$patientProfileArgs<ExtArgs>
    employeeProfile?: boolean | User$employeeProfileArgs<ExtArgs>
    doctorAppointments?: boolean | User$doctorAppointmentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    phone?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    phone?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    phone?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "phone" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patientProfile?: boolean | User$patientProfileArgs<ExtArgs>
    employeeProfile?: boolean | User$employeeProfileArgs<ExtArgs>
    doctorAppointments?: boolean | User$doctorAppointmentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      patientProfile: Prisma.$PatientProfilePayload<ExtArgs> | null
      employeeProfile: Prisma.$EmployeeProfilePayload<ExtArgs> | null
      doctorAppointments: Prisma.$AppointmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string
      phone: string | null
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patientProfile<T extends User$patientProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$patientProfileArgs<ExtArgs>>): Prisma__PatientProfileClient<$Result.GetResult<Prisma.$PatientProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    employeeProfile<T extends User$employeeProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$employeeProfileArgs<ExtArgs>>): Prisma__EmployeeProfileClient<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    doctorAppointments<T extends User$doctorAppointmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$doctorAppointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.patientProfile
   */
  export type User$patientProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientProfile
     */
    select?: PatientProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientProfile
     */
    omit?: PatientProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientProfileInclude<ExtArgs> | null
    where?: PatientProfileWhereInput
  }

  /**
   * User.employeeProfile
   */
  export type User$employeeProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeProfile
     */
    omit?: EmployeeProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileInclude<ExtArgs> | null
    where?: EmployeeProfileWhereInput
  }

  /**
   * User.doctorAppointments
   */
  export type User$doctorAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model EmployeeProfile
   */

  export type AggregateEmployeeProfile = {
    _count: EmployeeProfileCountAggregateOutputType | null
    _min: EmployeeProfileMinAggregateOutputType | null
    _max: EmployeeProfileMaxAggregateOutputType | null
  }

  export type EmployeeProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    position: string | null
    department: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    position: string | null
    department: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeProfileCountAggregateOutputType = {
    id: number
    userId: number
    position: number
    department: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmployeeProfileMinAggregateInputType = {
    id?: true
    userId?: true
    position?: true
    department?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    position?: true
    department?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeProfileCountAggregateInputType = {
    id?: true
    userId?: true
    position?: true
    department?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmployeeProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeProfile to aggregate.
     */
    where?: EmployeeProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeProfiles to fetch.
     */
    orderBy?: EmployeeProfileOrderByWithRelationInput | EmployeeProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmployeeProfiles
    **/
    _count?: true | EmployeeProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeProfileMaxAggregateInputType
  }

  export type GetEmployeeProfileAggregateType<T extends EmployeeProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployeeProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployeeProfile[P]>
      : GetScalarType<T[P], AggregateEmployeeProfile[P]>
  }




  export type EmployeeProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeProfileWhereInput
    orderBy?: EmployeeProfileOrderByWithAggregationInput | EmployeeProfileOrderByWithAggregationInput[]
    by: EmployeeProfileScalarFieldEnum[] | EmployeeProfileScalarFieldEnum
    having?: EmployeeProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeProfileCountAggregateInputType | true
    _min?: EmployeeProfileMinAggregateInputType
    _max?: EmployeeProfileMaxAggregateInputType
  }

  export type EmployeeProfileGroupByOutputType = {
    id: string
    userId: string
    position: string
    department: string
    createdAt: Date
    updatedAt: Date
    _count: EmployeeProfileCountAggregateOutputType | null
    _min: EmployeeProfileMinAggregateOutputType | null
    _max: EmployeeProfileMaxAggregateOutputType | null
  }

  type GetEmployeeProfileGroupByPayload<T extends EmployeeProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeProfileGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeProfileGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    position?: boolean
    department?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeProfile"]>

  export type EmployeeProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    position?: boolean
    department?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeProfile"]>

  export type EmployeeProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    position?: boolean
    department?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeProfile"]>

  export type EmployeeProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    position?: boolean
    department?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmployeeProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "position" | "department" | "createdAt" | "updatedAt", ExtArgs["result"]["employeeProfile"]>
  export type EmployeeProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EmployeeProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EmployeeProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EmployeeProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmployeeProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      position: string
      department: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["employeeProfile"]>
    composites: {}
  }

  type EmployeeProfileGetPayload<S extends boolean | null | undefined | EmployeeProfileDefaultArgs> = $Result.GetResult<Prisma.$EmployeeProfilePayload, S>

  type EmployeeProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployeeProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeProfileCountAggregateInputType | true
    }

  export interface EmployeeProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmployeeProfile'], meta: { name: 'EmployeeProfile' } }
    /**
     * Find zero or one EmployeeProfile that matches the filter.
     * @param {EmployeeProfileFindUniqueArgs} args - Arguments to find a EmployeeProfile
     * @example
     * // Get one EmployeeProfile
     * const employeeProfile = await prisma.employeeProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeProfileFindUniqueArgs>(args: SelectSubset<T, EmployeeProfileFindUniqueArgs<ExtArgs>>): Prisma__EmployeeProfileClient<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmployeeProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployeeProfileFindUniqueOrThrowArgs} args - Arguments to find a EmployeeProfile
     * @example
     * // Get one EmployeeProfile
     * const employeeProfile = await prisma.employeeProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeProfileClient<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmployeeProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeProfileFindFirstArgs} args - Arguments to find a EmployeeProfile
     * @example
     * // Get one EmployeeProfile
     * const employeeProfile = await prisma.employeeProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeProfileFindFirstArgs>(args?: SelectSubset<T, EmployeeProfileFindFirstArgs<ExtArgs>>): Prisma__EmployeeProfileClient<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmployeeProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeProfileFindFirstOrThrowArgs} args - Arguments to find a EmployeeProfile
     * @example
     * // Get one EmployeeProfile
     * const employeeProfile = await prisma.employeeProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeProfileClient<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmployeeProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmployeeProfiles
     * const employeeProfiles = await prisma.employeeProfile.findMany()
     * 
     * // Get first 10 EmployeeProfiles
     * const employeeProfiles = await prisma.employeeProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeProfileWithIdOnly = await prisma.employeeProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeProfileFindManyArgs>(args?: SelectSubset<T, EmployeeProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmployeeProfile.
     * @param {EmployeeProfileCreateArgs} args - Arguments to create a EmployeeProfile.
     * @example
     * // Create one EmployeeProfile
     * const EmployeeProfile = await prisma.employeeProfile.create({
     *   data: {
     *     // ... data to create a EmployeeProfile
     *   }
     * })
     * 
     */
    create<T extends EmployeeProfileCreateArgs>(args: SelectSubset<T, EmployeeProfileCreateArgs<ExtArgs>>): Prisma__EmployeeProfileClient<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmployeeProfiles.
     * @param {EmployeeProfileCreateManyArgs} args - Arguments to create many EmployeeProfiles.
     * @example
     * // Create many EmployeeProfiles
     * const employeeProfile = await prisma.employeeProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeProfileCreateManyArgs>(args?: SelectSubset<T, EmployeeProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmployeeProfiles and returns the data saved in the database.
     * @param {EmployeeProfileCreateManyAndReturnArgs} args - Arguments to create many EmployeeProfiles.
     * @example
     * // Create many EmployeeProfiles
     * const employeeProfile = await prisma.employeeProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmployeeProfiles and only return the `id`
     * const employeeProfileWithIdOnly = await prisma.employeeProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployeeProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployeeProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmployeeProfile.
     * @param {EmployeeProfileDeleteArgs} args - Arguments to delete one EmployeeProfile.
     * @example
     * // Delete one EmployeeProfile
     * const EmployeeProfile = await prisma.employeeProfile.delete({
     *   where: {
     *     // ... filter to delete one EmployeeProfile
     *   }
     * })
     * 
     */
    delete<T extends EmployeeProfileDeleteArgs>(args: SelectSubset<T, EmployeeProfileDeleteArgs<ExtArgs>>): Prisma__EmployeeProfileClient<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmployeeProfile.
     * @param {EmployeeProfileUpdateArgs} args - Arguments to update one EmployeeProfile.
     * @example
     * // Update one EmployeeProfile
     * const employeeProfile = await prisma.employeeProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeProfileUpdateArgs>(args: SelectSubset<T, EmployeeProfileUpdateArgs<ExtArgs>>): Prisma__EmployeeProfileClient<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmployeeProfiles.
     * @param {EmployeeProfileDeleteManyArgs} args - Arguments to filter EmployeeProfiles to delete.
     * @example
     * // Delete a few EmployeeProfiles
     * const { count } = await prisma.employeeProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeProfileDeleteManyArgs>(args?: SelectSubset<T, EmployeeProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmployeeProfiles
     * const employeeProfile = await prisma.employeeProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeProfileUpdateManyArgs>(args: SelectSubset<T, EmployeeProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeProfiles and returns the data updated in the database.
     * @param {EmployeeProfileUpdateManyAndReturnArgs} args - Arguments to update many EmployeeProfiles.
     * @example
     * // Update many EmployeeProfiles
     * const employeeProfile = await prisma.employeeProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmployeeProfiles and only return the `id`
     * const employeeProfileWithIdOnly = await prisma.employeeProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmployeeProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, EmployeeProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmployeeProfile.
     * @param {EmployeeProfileUpsertArgs} args - Arguments to update or create a EmployeeProfile.
     * @example
     * // Update or create a EmployeeProfile
     * const employeeProfile = await prisma.employeeProfile.upsert({
     *   create: {
     *     // ... data to create a EmployeeProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmployeeProfile we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeProfileUpsertArgs>(args: SelectSubset<T, EmployeeProfileUpsertArgs<ExtArgs>>): Prisma__EmployeeProfileClient<$Result.GetResult<Prisma.$EmployeeProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmployeeProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeProfileCountArgs} args - Arguments to filter EmployeeProfiles to count.
     * @example
     * // Count the number of EmployeeProfiles
     * const count = await prisma.employeeProfile.count({
     *   where: {
     *     // ... the filter for the EmployeeProfiles we want to count
     *   }
     * })
    **/
    count<T extends EmployeeProfileCountArgs>(
      args?: Subset<T, EmployeeProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmployeeProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeProfileAggregateArgs>(args: Subset<T, EmployeeProfileAggregateArgs>): Prisma.PrismaPromise<GetEmployeeProfileAggregateType<T>>

    /**
     * Group by EmployeeProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployeeProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeProfileGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployeeProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmployeeProfile model
   */
  readonly fields: EmployeeProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmployeeProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmployeeProfile model
   */
  interface EmployeeProfileFieldRefs {
    readonly id: FieldRef<"EmployeeProfile", 'String'>
    readonly userId: FieldRef<"EmployeeProfile", 'String'>
    readonly position: FieldRef<"EmployeeProfile", 'String'>
    readonly department: FieldRef<"EmployeeProfile", 'String'>
    readonly createdAt: FieldRef<"EmployeeProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"EmployeeProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmployeeProfile findUnique
   */
  export type EmployeeProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeProfile
     */
    omit?: EmployeeProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeProfile to fetch.
     */
    where: EmployeeProfileWhereUniqueInput
  }

  /**
   * EmployeeProfile findUniqueOrThrow
   */
  export type EmployeeProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeProfile
     */
    omit?: EmployeeProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeProfile to fetch.
     */
    where: EmployeeProfileWhereUniqueInput
  }

  /**
   * EmployeeProfile findFirst
   */
  export type EmployeeProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeProfile
     */
    omit?: EmployeeProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeProfile to fetch.
     */
    where?: EmployeeProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeProfiles to fetch.
     */
    orderBy?: EmployeeProfileOrderByWithRelationInput | EmployeeProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeProfiles.
     */
    cursor?: EmployeeProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeProfiles.
     */
    distinct?: EmployeeProfileScalarFieldEnum | EmployeeProfileScalarFieldEnum[]
  }

  /**
   * EmployeeProfile findFirstOrThrow
   */
  export type EmployeeProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeProfile
     */
    omit?: EmployeeProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeProfile to fetch.
     */
    where?: EmployeeProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeProfiles to fetch.
     */
    orderBy?: EmployeeProfileOrderByWithRelationInput | EmployeeProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeProfiles.
     */
    cursor?: EmployeeProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeProfiles.
     */
    distinct?: EmployeeProfileScalarFieldEnum | EmployeeProfileScalarFieldEnum[]
  }

  /**
   * EmployeeProfile findMany
   */
  export type EmployeeProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeProfile
     */
    omit?: EmployeeProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeProfiles to fetch.
     */
    where?: EmployeeProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeProfiles to fetch.
     */
    orderBy?: EmployeeProfileOrderByWithRelationInput | EmployeeProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmployeeProfiles.
     */
    cursor?: EmployeeProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeProfiles.
     */
    distinct?: EmployeeProfileScalarFieldEnum | EmployeeProfileScalarFieldEnum[]
  }

  /**
   * EmployeeProfile create
   */
  export type EmployeeProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeProfile
     */
    omit?: EmployeeProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a EmployeeProfile.
     */
    data: XOR<EmployeeProfileCreateInput, EmployeeProfileUncheckedCreateInput>
  }

  /**
   * EmployeeProfile createMany
   */
  export type EmployeeProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmployeeProfiles.
     */
    data: EmployeeProfileCreateManyInput | EmployeeProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmployeeProfile createManyAndReturn
   */
  export type EmployeeProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeProfile
     */
    omit?: EmployeeProfileOmit<ExtArgs> | null
    /**
     * The data used to create many EmployeeProfiles.
     */
    data: EmployeeProfileCreateManyInput | EmployeeProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmployeeProfile update
   */
  export type EmployeeProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeProfile
     */
    omit?: EmployeeProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a EmployeeProfile.
     */
    data: XOR<EmployeeProfileUpdateInput, EmployeeProfileUncheckedUpdateInput>
    /**
     * Choose, which EmployeeProfile to update.
     */
    where: EmployeeProfileWhereUniqueInput
  }

  /**
   * EmployeeProfile updateMany
   */
  export type EmployeeProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmployeeProfiles.
     */
    data: XOR<EmployeeProfileUpdateManyMutationInput, EmployeeProfileUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeProfiles to update
     */
    where?: EmployeeProfileWhereInput
    /**
     * Limit how many EmployeeProfiles to update.
     */
    limit?: number
  }

  /**
   * EmployeeProfile updateManyAndReturn
   */
  export type EmployeeProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeProfile
     */
    omit?: EmployeeProfileOmit<ExtArgs> | null
    /**
     * The data used to update EmployeeProfiles.
     */
    data: XOR<EmployeeProfileUpdateManyMutationInput, EmployeeProfileUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeProfiles to update
     */
    where?: EmployeeProfileWhereInput
    /**
     * Limit how many EmployeeProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmployeeProfile upsert
   */
  export type EmployeeProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeProfile
     */
    omit?: EmployeeProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the EmployeeProfile to update in case it exists.
     */
    where: EmployeeProfileWhereUniqueInput
    /**
     * In case the EmployeeProfile found by the `where` argument doesn't exist, create a new EmployeeProfile with this data.
     */
    create: XOR<EmployeeProfileCreateInput, EmployeeProfileUncheckedCreateInput>
    /**
     * In case the EmployeeProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeProfileUpdateInput, EmployeeProfileUncheckedUpdateInput>
  }

  /**
   * EmployeeProfile delete
   */
  export type EmployeeProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeProfile
     */
    omit?: EmployeeProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileInclude<ExtArgs> | null
    /**
     * Filter which EmployeeProfile to delete.
     */
    where: EmployeeProfileWhereUniqueInput
  }

  /**
   * EmployeeProfile deleteMany
   */
  export type EmployeeProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeProfiles to delete
     */
    where?: EmployeeProfileWhereInput
    /**
     * Limit how many EmployeeProfiles to delete.
     */
    limit?: number
  }

  /**
   * EmployeeProfile without action
   */
  export type EmployeeProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeProfile
     */
    select?: EmployeeProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeProfile
     */
    omit?: EmployeeProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeProfileInclude<ExtArgs> | null
  }


  /**
   * Model PatientProfile
   */

  export type AggregatePatientProfile = {
    _count: PatientProfileCountAggregateOutputType | null
    _min: PatientProfileMinAggregateOutputType | null
    _max: PatientProfileMaxAggregateOutputType | null
  }

  export type PatientProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    address: string | null
    gender: $Enums.Gender | null
    dateOfBirth: Date | null
    emergencyContactName: string | null
    emergencyContactPhone: string | null
    insuranceProvider: string | null
    insuranceNumber: string | null
    bloodType: $Enums.BloodType | null
    height: string | null
    weight: string | null
    bloodPressure: string | null
    heartRate: string | null
    bloodSugarLevel: string | null
    allergies: string | null
    medications: string | null
    chronicDiseases: string | null
    medicalHistory: string | null
    lastDentalVisit: Date | null
    gumCondition: $Enums.GumCondition | null
    toothDecay: string | null
    missingTeethCount: string | null
    prostheticsUsed: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PatientProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    address: string | null
    gender: $Enums.Gender | null
    dateOfBirth: Date | null
    emergencyContactName: string | null
    emergencyContactPhone: string | null
    insuranceProvider: string | null
    insuranceNumber: string | null
    bloodType: $Enums.BloodType | null
    height: string | null
    weight: string | null
    bloodPressure: string | null
    heartRate: string | null
    bloodSugarLevel: string | null
    allergies: string | null
    medications: string | null
    chronicDiseases: string | null
    medicalHistory: string | null
    lastDentalVisit: Date | null
    gumCondition: $Enums.GumCondition | null
    toothDecay: string | null
    missingTeethCount: string | null
    prostheticsUsed: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PatientProfileCountAggregateOutputType = {
    id: number
    userId: number
    address: number
    gender: number
    dateOfBirth: number
    emergencyContactName: number
    emergencyContactPhone: number
    insuranceProvider: number
    insuranceNumber: number
    bloodType: number
    height: number
    weight: number
    bloodPressure: number
    heartRate: number
    bloodSugarLevel: number
    allergies: number
    medications: number
    chronicDiseases: number
    medicalHistory: number
    lastDentalVisit: number
    gumCondition: number
    toothDecay: number
    missingTeethCount: number
    prostheticsUsed: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PatientProfileMinAggregateInputType = {
    id?: true
    userId?: true
    address?: true
    gender?: true
    dateOfBirth?: true
    emergencyContactName?: true
    emergencyContactPhone?: true
    insuranceProvider?: true
    insuranceNumber?: true
    bloodType?: true
    height?: true
    weight?: true
    bloodPressure?: true
    heartRate?: true
    bloodSugarLevel?: true
    allergies?: true
    medications?: true
    chronicDiseases?: true
    medicalHistory?: true
    lastDentalVisit?: true
    gumCondition?: true
    toothDecay?: true
    missingTeethCount?: true
    prostheticsUsed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PatientProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    address?: true
    gender?: true
    dateOfBirth?: true
    emergencyContactName?: true
    emergencyContactPhone?: true
    insuranceProvider?: true
    insuranceNumber?: true
    bloodType?: true
    height?: true
    weight?: true
    bloodPressure?: true
    heartRate?: true
    bloodSugarLevel?: true
    allergies?: true
    medications?: true
    chronicDiseases?: true
    medicalHistory?: true
    lastDentalVisit?: true
    gumCondition?: true
    toothDecay?: true
    missingTeethCount?: true
    prostheticsUsed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PatientProfileCountAggregateInputType = {
    id?: true
    userId?: true
    address?: true
    gender?: true
    dateOfBirth?: true
    emergencyContactName?: true
    emergencyContactPhone?: true
    insuranceProvider?: true
    insuranceNumber?: true
    bloodType?: true
    height?: true
    weight?: true
    bloodPressure?: true
    heartRate?: true
    bloodSugarLevel?: true
    allergies?: true
    medications?: true
    chronicDiseases?: true
    medicalHistory?: true
    lastDentalVisit?: true
    gumCondition?: true
    toothDecay?: true
    missingTeethCount?: true
    prostheticsUsed?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PatientProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatientProfile to aggregate.
     */
    where?: PatientProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientProfiles to fetch.
     */
    orderBy?: PatientProfileOrderByWithRelationInput | PatientProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PatientProfiles
    **/
    _count?: true | PatientProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientProfileMaxAggregateInputType
  }

  export type GetPatientProfileAggregateType<T extends PatientProfileAggregateArgs> = {
        [P in keyof T & keyof AggregatePatientProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatientProfile[P]>
      : GetScalarType<T[P], AggregatePatientProfile[P]>
  }




  export type PatientProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientProfileWhereInput
    orderBy?: PatientProfileOrderByWithAggregationInput | PatientProfileOrderByWithAggregationInput[]
    by: PatientProfileScalarFieldEnum[] | PatientProfileScalarFieldEnum
    having?: PatientProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientProfileCountAggregateInputType | true
    _min?: PatientProfileMinAggregateInputType
    _max?: PatientProfileMaxAggregateInputType
  }

  export type PatientProfileGroupByOutputType = {
    id: string
    userId: string
    address: string | null
    gender: $Enums.Gender | null
    dateOfBirth: Date | null
    emergencyContactName: string | null
    emergencyContactPhone: string | null
    insuranceProvider: string | null
    insuranceNumber: string | null
    bloodType: $Enums.BloodType
    height: string | null
    weight: string | null
    bloodPressure: string | null
    heartRate: string | null
    bloodSugarLevel: string | null
    allergies: string | null
    medications: string | null
    chronicDiseases: string | null
    medicalHistory: string | null
    lastDentalVisit: Date | null
    gumCondition: $Enums.GumCondition
    toothDecay: string | null
    missingTeethCount: string | null
    prostheticsUsed: string | null
    createdAt: Date
    updatedAt: Date
    _count: PatientProfileCountAggregateOutputType | null
    _min: PatientProfileMinAggregateOutputType | null
    _max: PatientProfileMaxAggregateOutputType | null
  }

  type GetPatientProfileGroupByPayload<T extends PatientProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientProfileGroupByOutputType[P]>
            : GetScalarType<T[P], PatientProfileGroupByOutputType[P]>
        }
      >
    >


  export type PatientProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    address?: boolean
    gender?: boolean
    dateOfBirth?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    insuranceProvider?: boolean
    insuranceNumber?: boolean
    bloodType?: boolean
    height?: boolean
    weight?: boolean
    bloodPressure?: boolean
    heartRate?: boolean
    bloodSugarLevel?: boolean
    allergies?: boolean
    medications?: boolean
    chronicDiseases?: boolean
    medicalHistory?: boolean
    lastDentalVisit?: boolean
    gumCondition?: boolean
    toothDecay?: boolean
    missingTeethCount?: boolean
    prostheticsUsed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    appointments?: boolean | PatientProfile$appointmentsArgs<ExtArgs>
    dentalHistory?: boolean | PatientProfile$dentalHistoryArgs<ExtArgs>
    medicalDocuments?: boolean | PatientProfile$medicalDocumentsArgs<ExtArgs>
    _count?: boolean | PatientProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patientProfile"]>

  export type PatientProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    address?: boolean
    gender?: boolean
    dateOfBirth?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    insuranceProvider?: boolean
    insuranceNumber?: boolean
    bloodType?: boolean
    height?: boolean
    weight?: boolean
    bloodPressure?: boolean
    heartRate?: boolean
    bloodSugarLevel?: boolean
    allergies?: boolean
    medications?: boolean
    chronicDiseases?: boolean
    medicalHistory?: boolean
    lastDentalVisit?: boolean
    gumCondition?: boolean
    toothDecay?: boolean
    missingTeethCount?: boolean
    prostheticsUsed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patientProfile"]>

  export type PatientProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    address?: boolean
    gender?: boolean
    dateOfBirth?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    insuranceProvider?: boolean
    insuranceNumber?: boolean
    bloodType?: boolean
    height?: boolean
    weight?: boolean
    bloodPressure?: boolean
    heartRate?: boolean
    bloodSugarLevel?: boolean
    allergies?: boolean
    medications?: boolean
    chronicDiseases?: boolean
    medicalHistory?: boolean
    lastDentalVisit?: boolean
    gumCondition?: boolean
    toothDecay?: boolean
    missingTeethCount?: boolean
    prostheticsUsed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patientProfile"]>

  export type PatientProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    address?: boolean
    gender?: boolean
    dateOfBirth?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    insuranceProvider?: boolean
    insuranceNumber?: boolean
    bloodType?: boolean
    height?: boolean
    weight?: boolean
    bloodPressure?: boolean
    heartRate?: boolean
    bloodSugarLevel?: boolean
    allergies?: boolean
    medications?: boolean
    chronicDiseases?: boolean
    medicalHistory?: boolean
    lastDentalVisit?: boolean
    gumCondition?: boolean
    toothDecay?: boolean
    missingTeethCount?: boolean
    prostheticsUsed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PatientProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "address" | "gender" | "dateOfBirth" | "emergencyContactName" | "emergencyContactPhone" | "insuranceProvider" | "insuranceNumber" | "bloodType" | "height" | "weight" | "bloodPressure" | "heartRate" | "bloodSugarLevel" | "allergies" | "medications" | "chronicDiseases" | "medicalHistory" | "lastDentalVisit" | "gumCondition" | "toothDecay" | "missingTeethCount" | "prostheticsUsed" | "createdAt" | "updatedAt", ExtArgs["result"]["patientProfile"]>
  export type PatientProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    appointments?: boolean | PatientProfile$appointmentsArgs<ExtArgs>
    dentalHistory?: boolean | PatientProfile$dentalHistoryArgs<ExtArgs>
    medicalDocuments?: boolean | PatientProfile$medicalDocumentsArgs<ExtArgs>
    _count?: boolean | PatientProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PatientProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PatientProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PatientProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PatientProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
      dentalHistory: Prisma.$DentalHistoryPayload<ExtArgs>[]
      medicalDocuments: Prisma.$MedicalDocumentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      address: string | null
      gender: $Enums.Gender | null
      dateOfBirth: Date | null
      emergencyContactName: string | null
      emergencyContactPhone: string | null
      insuranceProvider: string | null
      insuranceNumber: string | null
      bloodType: $Enums.BloodType
      height: string | null
      weight: string | null
      bloodPressure: string | null
      heartRate: string | null
      bloodSugarLevel: string | null
      allergies: string | null
      medications: string | null
      chronicDiseases: string | null
      medicalHistory: string | null
      lastDentalVisit: Date | null
      gumCondition: $Enums.GumCondition
      toothDecay: string | null
      missingTeethCount: string | null
      prostheticsUsed: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["patientProfile"]>
    composites: {}
  }

  type PatientProfileGetPayload<S extends boolean | null | undefined | PatientProfileDefaultArgs> = $Result.GetResult<Prisma.$PatientProfilePayload, S>

  type PatientProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatientProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatientProfileCountAggregateInputType | true
    }

  export interface PatientProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PatientProfile'], meta: { name: 'PatientProfile' } }
    /**
     * Find zero or one PatientProfile that matches the filter.
     * @param {PatientProfileFindUniqueArgs} args - Arguments to find a PatientProfile
     * @example
     * // Get one PatientProfile
     * const patientProfile = await prisma.patientProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientProfileFindUniqueArgs>(args: SelectSubset<T, PatientProfileFindUniqueArgs<ExtArgs>>): Prisma__PatientProfileClient<$Result.GetResult<Prisma.$PatientProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PatientProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientProfileFindUniqueOrThrowArgs} args - Arguments to find a PatientProfile
     * @example
     * // Get one PatientProfile
     * const patientProfile = await prisma.patientProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientProfileClient<$Result.GetResult<Prisma.$PatientProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PatientProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientProfileFindFirstArgs} args - Arguments to find a PatientProfile
     * @example
     * // Get one PatientProfile
     * const patientProfile = await prisma.patientProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientProfileFindFirstArgs>(args?: SelectSubset<T, PatientProfileFindFirstArgs<ExtArgs>>): Prisma__PatientProfileClient<$Result.GetResult<Prisma.$PatientProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PatientProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientProfileFindFirstOrThrowArgs} args - Arguments to find a PatientProfile
     * @example
     * // Get one PatientProfile
     * const patientProfile = await prisma.patientProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientProfileClient<$Result.GetResult<Prisma.$PatientProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PatientProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PatientProfiles
     * const patientProfiles = await prisma.patientProfile.findMany()
     * 
     * // Get first 10 PatientProfiles
     * const patientProfiles = await prisma.patientProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patientProfileWithIdOnly = await prisma.patientProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatientProfileFindManyArgs>(args?: SelectSubset<T, PatientProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PatientProfile.
     * @param {PatientProfileCreateArgs} args - Arguments to create a PatientProfile.
     * @example
     * // Create one PatientProfile
     * const PatientProfile = await prisma.patientProfile.create({
     *   data: {
     *     // ... data to create a PatientProfile
     *   }
     * })
     * 
     */
    create<T extends PatientProfileCreateArgs>(args: SelectSubset<T, PatientProfileCreateArgs<ExtArgs>>): Prisma__PatientProfileClient<$Result.GetResult<Prisma.$PatientProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PatientProfiles.
     * @param {PatientProfileCreateManyArgs} args - Arguments to create many PatientProfiles.
     * @example
     * // Create many PatientProfiles
     * const patientProfile = await prisma.patientProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientProfileCreateManyArgs>(args?: SelectSubset<T, PatientProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PatientProfiles and returns the data saved in the database.
     * @param {PatientProfileCreateManyAndReturnArgs} args - Arguments to create many PatientProfiles.
     * @example
     * // Create many PatientProfiles
     * const patientProfile = await prisma.patientProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PatientProfiles and only return the `id`
     * const patientProfileWithIdOnly = await prisma.patientProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatientProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, PatientProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PatientProfile.
     * @param {PatientProfileDeleteArgs} args - Arguments to delete one PatientProfile.
     * @example
     * // Delete one PatientProfile
     * const PatientProfile = await prisma.patientProfile.delete({
     *   where: {
     *     // ... filter to delete one PatientProfile
     *   }
     * })
     * 
     */
    delete<T extends PatientProfileDeleteArgs>(args: SelectSubset<T, PatientProfileDeleteArgs<ExtArgs>>): Prisma__PatientProfileClient<$Result.GetResult<Prisma.$PatientProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PatientProfile.
     * @param {PatientProfileUpdateArgs} args - Arguments to update one PatientProfile.
     * @example
     * // Update one PatientProfile
     * const patientProfile = await prisma.patientProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientProfileUpdateArgs>(args: SelectSubset<T, PatientProfileUpdateArgs<ExtArgs>>): Prisma__PatientProfileClient<$Result.GetResult<Prisma.$PatientProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PatientProfiles.
     * @param {PatientProfileDeleteManyArgs} args - Arguments to filter PatientProfiles to delete.
     * @example
     * // Delete a few PatientProfiles
     * const { count } = await prisma.patientProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientProfileDeleteManyArgs>(args?: SelectSubset<T, PatientProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatientProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PatientProfiles
     * const patientProfile = await prisma.patientProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientProfileUpdateManyArgs>(args: SelectSubset<T, PatientProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatientProfiles and returns the data updated in the database.
     * @param {PatientProfileUpdateManyAndReturnArgs} args - Arguments to update many PatientProfiles.
     * @example
     * // Update many PatientProfiles
     * const patientProfile = await prisma.patientProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PatientProfiles and only return the `id`
     * const patientProfileWithIdOnly = await prisma.patientProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PatientProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, PatientProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PatientProfile.
     * @param {PatientProfileUpsertArgs} args - Arguments to update or create a PatientProfile.
     * @example
     * // Update or create a PatientProfile
     * const patientProfile = await prisma.patientProfile.upsert({
     *   create: {
     *     // ... data to create a PatientProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PatientProfile we want to update
     *   }
     * })
     */
    upsert<T extends PatientProfileUpsertArgs>(args: SelectSubset<T, PatientProfileUpsertArgs<ExtArgs>>): Prisma__PatientProfileClient<$Result.GetResult<Prisma.$PatientProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PatientProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientProfileCountArgs} args - Arguments to filter PatientProfiles to count.
     * @example
     * // Count the number of PatientProfiles
     * const count = await prisma.patientProfile.count({
     *   where: {
     *     // ... the filter for the PatientProfiles we want to count
     *   }
     * })
    **/
    count<T extends PatientProfileCountArgs>(
      args?: Subset<T, PatientProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PatientProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatientProfileAggregateArgs>(args: Subset<T, PatientProfileAggregateArgs>): Prisma.PrismaPromise<GetPatientProfileAggregateType<T>>

    /**
     * Group by PatientProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatientProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientProfileGroupByArgs['orderBy'] }
        : { orderBy?: PatientProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatientProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PatientProfile model
   */
  readonly fields: PatientProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PatientProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    appointments<T extends PatientProfile$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, PatientProfile$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    dentalHistory<T extends PatientProfile$dentalHistoryArgs<ExtArgs> = {}>(args?: Subset<T, PatientProfile$dentalHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DentalHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    medicalDocuments<T extends PatientProfile$medicalDocumentsArgs<ExtArgs> = {}>(args?: Subset<T, PatientProfile$medicalDocumentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PatientProfile model
   */
  interface PatientProfileFieldRefs {
    readonly id: FieldRef<"PatientProfile", 'String'>
    readonly userId: FieldRef<"PatientProfile", 'String'>
    readonly address: FieldRef<"PatientProfile", 'String'>
    readonly gender: FieldRef<"PatientProfile", 'Gender'>
    readonly dateOfBirth: FieldRef<"PatientProfile", 'DateTime'>
    readonly emergencyContactName: FieldRef<"PatientProfile", 'String'>
    readonly emergencyContactPhone: FieldRef<"PatientProfile", 'String'>
    readonly insuranceProvider: FieldRef<"PatientProfile", 'String'>
    readonly insuranceNumber: FieldRef<"PatientProfile", 'String'>
    readonly bloodType: FieldRef<"PatientProfile", 'BloodType'>
    readonly height: FieldRef<"PatientProfile", 'String'>
    readonly weight: FieldRef<"PatientProfile", 'String'>
    readonly bloodPressure: FieldRef<"PatientProfile", 'String'>
    readonly heartRate: FieldRef<"PatientProfile", 'String'>
    readonly bloodSugarLevel: FieldRef<"PatientProfile", 'String'>
    readonly allergies: FieldRef<"PatientProfile", 'String'>
    readonly medications: FieldRef<"PatientProfile", 'String'>
    readonly chronicDiseases: FieldRef<"PatientProfile", 'String'>
    readonly medicalHistory: FieldRef<"PatientProfile", 'String'>
    readonly lastDentalVisit: FieldRef<"PatientProfile", 'DateTime'>
    readonly gumCondition: FieldRef<"PatientProfile", 'GumCondition'>
    readonly toothDecay: FieldRef<"PatientProfile", 'String'>
    readonly missingTeethCount: FieldRef<"PatientProfile", 'String'>
    readonly prostheticsUsed: FieldRef<"PatientProfile", 'String'>
    readonly createdAt: FieldRef<"PatientProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"PatientProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PatientProfile findUnique
   */
  export type PatientProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientProfile
     */
    select?: PatientProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientProfile
     */
    omit?: PatientProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientProfileInclude<ExtArgs> | null
    /**
     * Filter, which PatientProfile to fetch.
     */
    where: PatientProfileWhereUniqueInput
  }

  /**
   * PatientProfile findUniqueOrThrow
   */
  export type PatientProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientProfile
     */
    select?: PatientProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientProfile
     */
    omit?: PatientProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientProfileInclude<ExtArgs> | null
    /**
     * Filter, which PatientProfile to fetch.
     */
    where: PatientProfileWhereUniqueInput
  }

  /**
   * PatientProfile findFirst
   */
  export type PatientProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientProfile
     */
    select?: PatientProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientProfile
     */
    omit?: PatientProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientProfileInclude<ExtArgs> | null
    /**
     * Filter, which PatientProfile to fetch.
     */
    where?: PatientProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientProfiles to fetch.
     */
    orderBy?: PatientProfileOrderByWithRelationInput | PatientProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatientProfiles.
     */
    cursor?: PatientProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatientProfiles.
     */
    distinct?: PatientProfileScalarFieldEnum | PatientProfileScalarFieldEnum[]
  }

  /**
   * PatientProfile findFirstOrThrow
   */
  export type PatientProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientProfile
     */
    select?: PatientProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientProfile
     */
    omit?: PatientProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientProfileInclude<ExtArgs> | null
    /**
     * Filter, which PatientProfile to fetch.
     */
    where?: PatientProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientProfiles to fetch.
     */
    orderBy?: PatientProfileOrderByWithRelationInput | PatientProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatientProfiles.
     */
    cursor?: PatientProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatientProfiles.
     */
    distinct?: PatientProfileScalarFieldEnum | PatientProfileScalarFieldEnum[]
  }

  /**
   * PatientProfile findMany
   */
  export type PatientProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientProfile
     */
    select?: PatientProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientProfile
     */
    omit?: PatientProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientProfileInclude<ExtArgs> | null
    /**
     * Filter, which PatientProfiles to fetch.
     */
    where?: PatientProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientProfiles to fetch.
     */
    orderBy?: PatientProfileOrderByWithRelationInput | PatientProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PatientProfiles.
     */
    cursor?: PatientProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatientProfiles.
     */
    distinct?: PatientProfileScalarFieldEnum | PatientProfileScalarFieldEnum[]
  }

  /**
   * PatientProfile create
   */
  export type PatientProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientProfile
     */
    select?: PatientProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientProfile
     */
    omit?: PatientProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a PatientProfile.
     */
    data: XOR<PatientProfileCreateInput, PatientProfileUncheckedCreateInput>
  }

  /**
   * PatientProfile createMany
   */
  export type PatientProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PatientProfiles.
     */
    data: PatientProfileCreateManyInput | PatientProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PatientProfile createManyAndReturn
   */
  export type PatientProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientProfile
     */
    select?: PatientProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PatientProfile
     */
    omit?: PatientProfileOmit<ExtArgs> | null
    /**
     * The data used to create many PatientProfiles.
     */
    data: PatientProfileCreateManyInput | PatientProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatientProfile update
   */
  export type PatientProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientProfile
     */
    select?: PatientProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientProfile
     */
    omit?: PatientProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a PatientProfile.
     */
    data: XOR<PatientProfileUpdateInput, PatientProfileUncheckedUpdateInput>
    /**
     * Choose, which PatientProfile to update.
     */
    where: PatientProfileWhereUniqueInput
  }

  /**
   * PatientProfile updateMany
   */
  export type PatientProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PatientProfiles.
     */
    data: XOR<PatientProfileUpdateManyMutationInput, PatientProfileUncheckedUpdateManyInput>
    /**
     * Filter which PatientProfiles to update
     */
    where?: PatientProfileWhereInput
    /**
     * Limit how many PatientProfiles to update.
     */
    limit?: number
  }

  /**
   * PatientProfile updateManyAndReturn
   */
  export type PatientProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientProfile
     */
    select?: PatientProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PatientProfile
     */
    omit?: PatientProfileOmit<ExtArgs> | null
    /**
     * The data used to update PatientProfiles.
     */
    data: XOR<PatientProfileUpdateManyMutationInput, PatientProfileUncheckedUpdateManyInput>
    /**
     * Filter which PatientProfiles to update
     */
    where?: PatientProfileWhereInput
    /**
     * Limit how many PatientProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatientProfile upsert
   */
  export type PatientProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientProfile
     */
    select?: PatientProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientProfile
     */
    omit?: PatientProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the PatientProfile to update in case it exists.
     */
    where: PatientProfileWhereUniqueInput
    /**
     * In case the PatientProfile found by the `where` argument doesn't exist, create a new PatientProfile with this data.
     */
    create: XOR<PatientProfileCreateInput, PatientProfileUncheckedCreateInput>
    /**
     * In case the PatientProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientProfileUpdateInput, PatientProfileUncheckedUpdateInput>
  }

  /**
   * PatientProfile delete
   */
  export type PatientProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientProfile
     */
    select?: PatientProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientProfile
     */
    omit?: PatientProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientProfileInclude<ExtArgs> | null
    /**
     * Filter which PatientProfile to delete.
     */
    where: PatientProfileWhereUniqueInput
  }

  /**
   * PatientProfile deleteMany
   */
  export type PatientProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatientProfiles to delete
     */
    where?: PatientProfileWhereInput
    /**
     * Limit how many PatientProfiles to delete.
     */
    limit?: number
  }

  /**
   * PatientProfile.appointments
   */
  export type PatientProfile$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * PatientProfile.dentalHistory
   */
  export type PatientProfile$dentalHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DentalHistory
     */
    select?: DentalHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DentalHistory
     */
    omit?: DentalHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentalHistoryInclude<ExtArgs> | null
    where?: DentalHistoryWhereInput
    orderBy?: DentalHistoryOrderByWithRelationInput | DentalHistoryOrderByWithRelationInput[]
    cursor?: DentalHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DentalHistoryScalarFieldEnum | DentalHistoryScalarFieldEnum[]
  }

  /**
   * PatientProfile.medicalDocuments
   */
  export type PatientProfile$medicalDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDocument
     */
    select?: MedicalDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDocument
     */
    omit?: MedicalDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDocumentInclude<ExtArgs> | null
    where?: MedicalDocumentWhereInput
    orderBy?: MedicalDocumentOrderByWithRelationInput | MedicalDocumentOrderByWithRelationInput[]
    cursor?: MedicalDocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MedicalDocumentScalarFieldEnum | MedicalDocumentScalarFieldEnum[]
  }

  /**
   * PatientProfile without action
   */
  export type PatientProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientProfile
     */
    select?: PatientProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientProfile
     */
    omit?: PatientProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientProfileInclude<ExtArgs> | null
  }


  /**
   * Model Appointment
   */

  export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  export type AppointmentMinAggregateOutputType = {
    id: string | null
    patientId: string | null
    guestFirstName: string | null
    guestLastName: string | null
    guestEmail: string | null
    guestPhone: string | null
    doctorId: string | null
    date: Date | null
    time: string | null
    reason: string | null
    notes: string | null
    status: $Enums.AppointmentStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentMaxAggregateOutputType = {
    id: string | null
    patientId: string | null
    guestFirstName: string | null
    guestLastName: string | null
    guestEmail: string | null
    guestPhone: string | null
    doctorId: string | null
    date: Date | null
    time: string | null
    reason: string | null
    notes: string | null
    status: $Enums.AppointmentStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentCountAggregateOutputType = {
    id: number
    patientId: number
    guestFirstName: number
    guestLastName: number
    guestEmail: number
    guestPhone: number
    doctorId: number
    date: number
    time: number
    reason: number
    notes: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AppointmentMinAggregateInputType = {
    id?: true
    patientId?: true
    guestFirstName?: true
    guestLastName?: true
    guestEmail?: true
    guestPhone?: true
    doctorId?: true
    date?: true
    time?: true
    reason?: true
    notes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentMaxAggregateInputType = {
    id?: true
    patientId?: true
    guestFirstName?: true
    guestLastName?: true
    guestEmail?: true
    guestPhone?: true
    doctorId?: true
    date?: true
    time?: true
    reason?: true
    notes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentCountAggregateInputType = {
    id?: true
    patientId?: true
    guestFirstName?: true
    guestLastName?: true
    guestEmail?: true
    guestPhone?: true
    doctorId?: true
    date?: true
    time?: true
    reason?: true
    notes?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointment to aggregate.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Appointments
    **/
    _count?: true | AppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentMaxAggregateInputType
  }

  export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointment[P]>
      : GetScalarType<T[P], AggregateAppointment[P]>
  }




  export type AppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithAggregationInput | AppointmentOrderByWithAggregationInput[]
    by: AppointmentScalarFieldEnum[] | AppointmentScalarFieldEnum
    having?: AppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentCountAggregateInputType | true
    _min?: AppointmentMinAggregateInputType
    _max?: AppointmentMaxAggregateInputType
  }

  export type AppointmentGroupByOutputType = {
    id: string
    patientId: string | null
    guestFirstName: string | null
    guestLastName: string | null
    guestEmail: string | null
    guestPhone: string | null
    doctorId: string | null
    date: Date
    time: string
    reason: string
    notes: string | null
    status: $Enums.AppointmentStatus
    createdAt: Date
    updatedAt: Date
    _count: AppointmentCountAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    guestFirstName?: boolean
    guestLastName?: boolean
    guestEmail?: boolean
    guestPhone?: boolean
    doctorId?: boolean
    date?: boolean
    time?: boolean
    reason?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | Appointment$patientArgs<ExtArgs>
    doctor?: boolean | Appointment$doctorArgs<ExtArgs>
    dentalHistory?: boolean | Appointment$dentalHistoryArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    guestFirstName?: boolean
    guestLastName?: boolean
    guestEmail?: boolean
    guestPhone?: boolean
    doctorId?: boolean
    date?: boolean
    time?: boolean
    reason?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | Appointment$patientArgs<ExtArgs>
    doctor?: boolean | Appointment$doctorArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    guestFirstName?: boolean
    guestLastName?: boolean
    guestEmail?: boolean
    guestPhone?: boolean
    doctorId?: boolean
    date?: boolean
    time?: boolean
    reason?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | Appointment$patientArgs<ExtArgs>
    doctor?: boolean | Appointment$doctorArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectScalar = {
    id?: boolean
    patientId?: boolean
    guestFirstName?: boolean
    guestLastName?: boolean
    guestEmail?: boolean
    guestPhone?: boolean
    doctorId?: boolean
    date?: boolean
    time?: boolean
    reason?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AppointmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "patientId" | "guestFirstName" | "guestLastName" | "guestEmail" | "guestPhone" | "doctorId" | "date" | "time" | "reason" | "notes" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["appointment"]>
  export type AppointmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | Appointment$patientArgs<ExtArgs>
    doctor?: boolean | Appointment$doctorArgs<ExtArgs>
    dentalHistory?: boolean | Appointment$dentalHistoryArgs<ExtArgs>
  }
  export type AppointmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | Appointment$patientArgs<ExtArgs>
    doctor?: boolean | Appointment$doctorArgs<ExtArgs>
  }
  export type AppointmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | Appointment$patientArgs<ExtArgs>
    doctor?: boolean | Appointment$doctorArgs<ExtArgs>
  }

  export type $AppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Appointment"
    objects: {
      patient: Prisma.$PatientProfilePayload<ExtArgs> | null
      doctor: Prisma.$UserPayload<ExtArgs> | null
      dentalHistory: Prisma.$DentalHistoryPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      patientId: string | null
      guestFirstName: string | null
      guestLastName: string | null
      guestEmail: string | null
      guestPhone: string | null
      doctorId: string | null
      date: Date
      time: string
      reason: string
      notes: string | null
      status: $Enums.AppointmentStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["appointment"]>
    composites: {}
  }

  type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = $Result.GetResult<Prisma.$AppointmentPayload, S>

  type AppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppointmentCountAggregateInputType | true
    }

  export interface AppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Appointment'], meta: { name: 'Appointment' } }
    /**
     * Find zero or one Appointment that matches the filter.
     * @param {AppointmentFindUniqueArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentFindUniqueArgs>(args: SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Appointment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppointmentFindUniqueOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentFindFirstArgs>(args?: SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Appointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Appointments
     * const appointments = await prisma.appointment.findMany()
     * 
     * // Get first 10 Appointments
     * const appointments = await prisma.appointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appointmentWithIdOnly = await prisma.appointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppointmentFindManyArgs>(args?: SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Appointment.
     * @param {AppointmentCreateArgs} args - Arguments to create a Appointment.
     * @example
     * // Create one Appointment
     * const Appointment = await prisma.appointment.create({
     *   data: {
     *     // ... data to create a Appointment
     *   }
     * })
     * 
     */
    create<T extends AppointmentCreateArgs>(args: SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Appointments.
     * @param {AppointmentCreateManyArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentCreateManyArgs>(args?: SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Appointments and returns the data saved in the database.
     * @param {AppointmentCreateManyAndReturnArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppointmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Appointment.
     * @param {AppointmentDeleteArgs} args - Arguments to delete one Appointment.
     * @example
     * // Delete one Appointment
     * const Appointment = await prisma.appointment.delete({
     *   where: {
     *     // ... filter to delete one Appointment
     *   }
     * })
     * 
     */
    delete<T extends AppointmentDeleteArgs>(args: SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Appointment.
     * @param {AppointmentUpdateArgs} args - Arguments to update one Appointment.
     * @example
     * // Update one Appointment
     * const appointment = await prisma.appointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentUpdateArgs>(args: SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Appointments.
     * @param {AppointmentDeleteManyArgs} args - Arguments to filter Appointments to delete.
     * @example
     * // Delete a few Appointments
     * const { count } = await prisma.appointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentUpdateManyArgs>(args: SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments and returns the data updated in the database.
     * @param {AppointmentUpdateManyAndReturnArgs} args - Arguments to update many Appointments.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AppointmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AppointmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Appointment.
     * @param {AppointmentUpsertArgs} args - Arguments to update or create a Appointment.
     * @example
     * // Update or create a Appointment
     * const appointment = await prisma.appointment.upsert({
     *   create: {
     *     // ... data to create a Appointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Appointment we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentUpsertArgs>(args: SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentCountArgs} args - Arguments to filter Appointments to count.
     * @example
     * // Count the number of Appointments
     * const count = await prisma.appointment.count({
     *   where: {
     *     // ... the filter for the Appointments we want to count
     *   }
     * })
    **/
    count<T extends AppointmentCountArgs>(
      args?: Subset<T, AppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppointmentAggregateArgs>(args: Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>

    /**
     * Group by Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Appointment model
   */
  readonly fields: AppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Appointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends Appointment$patientArgs<ExtArgs> = {}>(args?: Subset<T, Appointment$patientArgs<ExtArgs>>): Prisma__PatientProfileClient<$Result.GetResult<Prisma.$PatientProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    doctor<T extends Appointment$doctorArgs<ExtArgs> = {}>(args?: Subset<T, Appointment$doctorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    dentalHistory<T extends Appointment$dentalHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Appointment$dentalHistoryArgs<ExtArgs>>): Prisma__DentalHistoryClient<$Result.GetResult<Prisma.$DentalHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Appointment model
   */
  interface AppointmentFieldRefs {
    readonly id: FieldRef<"Appointment", 'String'>
    readonly patientId: FieldRef<"Appointment", 'String'>
    readonly guestFirstName: FieldRef<"Appointment", 'String'>
    readonly guestLastName: FieldRef<"Appointment", 'String'>
    readonly guestEmail: FieldRef<"Appointment", 'String'>
    readonly guestPhone: FieldRef<"Appointment", 'String'>
    readonly doctorId: FieldRef<"Appointment", 'String'>
    readonly date: FieldRef<"Appointment", 'DateTime'>
    readonly time: FieldRef<"Appointment", 'String'>
    readonly reason: FieldRef<"Appointment", 'String'>
    readonly notes: FieldRef<"Appointment", 'String'>
    readonly status: FieldRef<"Appointment", 'AppointmentStatus'>
    readonly createdAt: FieldRef<"Appointment", 'DateTime'>
    readonly updatedAt: FieldRef<"Appointment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Appointment findUnique
   */
  export type AppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findUniqueOrThrow
   */
  export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findFirst
   */
  export type AppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findFirstOrThrow
   */
  export type AppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findMany
   */
  export type AppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointments to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment create
   */
  export type AppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Appointment.
     */
    data: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
  }

  /**
   * Appointment createMany
   */
  export type AppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Appointment createManyAndReturn
   */
  export type AppointmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment update
   */
  export type AppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Appointment.
     */
    data: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
    /**
     * Choose, which Appointment to update.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment updateMany
   */
  export type AppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
  }

  /**
   * Appointment updateManyAndReturn
   */
  export type AppointmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment upsert
   */
  export type AppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Appointment to update in case it exists.
     */
    where: AppointmentWhereUniqueInput
    /**
     * In case the Appointment found by the `where` argument doesn't exist, create a new Appointment with this data.
     */
    create: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
    /**
     * In case the Appointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
  }

  /**
   * Appointment delete
   */
  export type AppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter which Appointment to delete.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment deleteMany
   */
  export type AppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointments to delete
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to delete.
     */
    limit?: number
  }

  /**
   * Appointment.patient
   */
  export type Appointment$patientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientProfile
     */
    select?: PatientProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientProfile
     */
    omit?: PatientProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientProfileInclude<ExtArgs> | null
    where?: PatientProfileWhereInput
  }

  /**
   * Appointment.doctor
   */
  export type Appointment$doctorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Appointment.dentalHistory
   */
  export type Appointment$dentalHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DentalHistory
     */
    select?: DentalHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DentalHistory
     */
    omit?: DentalHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentalHistoryInclude<ExtArgs> | null
    where?: DentalHistoryWhereInput
  }

  /**
   * Appointment without action
   */
  export type AppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
  }


  /**
   * Model DentalHistory
   */

  export type AggregateDentalHistory = {
    _count: DentalHistoryCountAggregateOutputType | null
    _min: DentalHistoryMinAggregateOutputType | null
    _max: DentalHistoryMaxAggregateOutputType | null
  }

  export type DentalHistoryMinAggregateOutputType = {
    id: string | null
    patientId: string | null
    appointmentId: string | null
    treatmentType: string | null
    treatmentStatus: $Enums.TreatmentStatus | null
    paymentStatus: $Enums.PaymentStatus | null
    date: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DentalHistoryMaxAggregateOutputType = {
    id: string | null
    patientId: string | null
    appointmentId: string | null
    treatmentType: string | null
    treatmentStatus: $Enums.TreatmentStatus | null
    paymentStatus: $Enums.PaymentStatus | null
    date: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DentalHistoryCountAggregateOutputType = {
    id: number
    patientId: number
    appointmentId: number
    treatmentType: number
    treatmentStatus: number
    paymentStatus: number
    date: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DentalHistoryMinAggregateInputType = {
    id?: true
    patientId?: true
    appointmentId?: true
    treatmentType?: true
    treatmentStatus?: true
    paymentStatus?: true
    date?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DentalHistoryMaxAggregateInputType = {
    id?: true
    patientId?: true
    appointmentId?: true
    treatmentType?: true
    treatmentStatus?: true
    paymentStatus?: true
    date?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DentalHistoryCountAggregateInputType = {
    id?: true
    patientId?: true
    appointmentId?: true
    treatmentType?: true
    treatmentStatus?: true
    paymentStatus?: true
    date?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DentalHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DentalHistory to aggregate.
     */
    where?: DentalHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DentalHistories to fetch.
     */
    orderBy?: DentalHistoryOrderByWithRelationInput | DentalHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DentalHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DentalHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DentalHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DentalHistories
    **/
    _count?: true | DentalHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DentalHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DentalHistoryMaxAggregateInputType
  }

  export type GetDentalHistoryAggregateType<T extends DentalHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateDentalHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDentalHistory[P]>
      : GetScalarType<T[P], AggregateDentalHistory[P]>
  }




  export type DentalHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DentalHistoryWhereInput
    orderBy?: DentalHistoryOrderByWithAggregationInput | DentalHistoryOrderByWithAggregationInput[]
    by: DentalHistoryScalarFieldEnum[] | DentalHistoryScalarFieldEnum
    having?: DentalHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DentalHistoryCountAggregateInputType | true
    _min?: DentalHistoryMinAggregateInputType
    _max?: DentalHistoryMaxAggregateInputType
  }

  export type DentalHistoryGroupByOutputType = {
    id: string
    patientId: string
    appointmentId: string | null
    treatmentType: string
    treatmentStatus: $Enums.TreatmentStatus
    paymentStatus: $Enums.PaymentStatus
    date: Date
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: DentalHistoryCountAggregateOutputType | null
    _min: DentalHistoryMinAggregateOutputType | null
    _max: DentalHistoryMaxAggregateOutputType | null
  }

  type GetDentalHistoryGroupByPayload<T extends DentalHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DentalHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DentalHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DentalHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], DentalHistoryGroupByOutputType[P]>
        }
      >
    >


  export type DentalHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    appointmentId?: boolean
    treatmentType?: boolean
    treatmentStatus?: boolean
    paymentStatus?: boolean
    date?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientProfileDefaultArgs<ExtArgs>
    appointment?: boolean | DentalHistory$appointmentArgs<ExtArgs>
  }, ExtArgs["result"]["dentalHistory"]>

  export type DentalHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    appointmentId?: boolean
    treatmentType?: boolean
    treatmentStatus?: boolean
    paymentStatus?: boolean
    date?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientProfileDefaultArgs<ExtArgs>
    appointment?: boolean | DentalHistory$appointmentArgs<ExtArgs>
  }, ExtArgs["result"]["dentalHistory"]>

  export type DentalHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    appointmentId?: boolean
    treatmentType?: boolean
    treatmentStatus?: boolean
    paymentStatus?: boolean
    date?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientProfileDefaultArgs<ExtArgs>
    appointment?: boolean | DentalHistory$appointmentArgs<ExtArgs>
  }, ExtArgs["result"]["dentalHistory"]>

  export type DentalHistorySelectScalar = {
    id?: boolean
    patientId?: boolean
    appointmentId?: boolean
    treatmentType?: boolean
    treatmentStatus?: boolean
    paymentStatus?: boolean
    date?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DentalHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "patientId" | "appointmentId" | "treatmentType" | "treatmentStatus" | "paymentStatus" | "date" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["dentalHistory"]>
  export type DentalHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientProfileDefaultArgs<ExtArgs>
    appointment?: boolean | DentalHistory$appointmentArgs<ExtArgs>
  }
  export type DentalHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientProfileDefaultArgs<ExtArgs>
    appointment?: boolean | DentalHistory$appointmentArgs<ExtArgs>
  }
  export type DentalHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientProfileDefaultArgs<ExtArgs>
    appointment?: boolean | DentalHistory$appointmentArgs<ExtArgs>
  }

  export type $DentalHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DentalHistory"
    objects: {
      patient: Prisma.$PatientProfilePayload<ExtArgs>
      appointment: Prisma.$AppointmentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      patientId: string
      appointmentId: string | null
      treatmentType: string
      treatmentStatus: $Enums.TreatmentStatus
      paymentStatus: $Enums.PaymentStatus
      date: Date
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dentalHistory"]>
    composites: {}
  }

  type DentalHistoryGetPayload<S extends boolean | null | undefined | DentalHistoryDefaultArgs> = $Result.GetResult<Prisma.$DentalHistoryPayload, S>

  type DentalHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DentalHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DentalHistoryCountAggregateInputType | true
    }

  export interface DentalHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DentalHistory'], meta: { name: 'DentalHistory' } }
    /**
     * Find zero or one DentalHistory that matches the filter.
     * @param {DentalHistoryFindUniqueArgs} args - Arguments to find a DentalHistory
     * @example
     * // Get one DentalHistory
     * const dentalHistory = await prisma.dentalHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DentalHistoryFindUniqueArgs>(args: SelectSubset<T, DentalHistoryFindUniqueArgs<ExtArgs>>): Prisma__DentalHistoryClient<$Result.GetResult<Prisma.$DentalHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DentalHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DentalHistoryFindUniqueOrThrowArgs} args - Arguments to find a DentalHistory
     * @example
     * // Get one DentalHistory
     * const dentalHistory = await prisma.dentalHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DentalHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, DentalHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DentalHistoryClient<$Result.GetResult<Prisma.$DentalHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DentalHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DentalHistoryFindFirstArgs} args - Arguments to find a DentalHistory
     * @example
     * // Get one DentalHistory
     * const dentalHistory = await prisma.dentalHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DentalHistoryFindFirstArgs>(args?: SelectSubset<T, DentalHistoryFindFirstArgs<ExtArgs>>): Prisma__DentalHistoryClient<$Result.GetResult<Prisma.$DentalHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DentalHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DentalHistoryFindFirstOrThrowArgs} args - Arguments to find a DentalHistory
     * @example
     * // Get one DentalHistory
     * const dentalHistory = await prisma.dentalHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DentalHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, DentalHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__DentalHistoryClient<$Result.GetResult<Prisma.$DentalHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DentalHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DentalHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DentalHistories
     * const dentalHistories = await prisma.dentalHistory.findMany()
     * 
     * // Get first 10 DentalHistories
     * const dentalHistories = await prisma.dentalHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dentalHistoryWithIdOnly = await prisma.dentalHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DentalHistoryFindManyArgs>(args?: SelectSubset<T, DentalHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DentalHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DentalHistory.
     * @param {DentalHistoryCreateArgs} args - Arguments to create a DentalHistory.
     * @example
     * // Create one DentalHistory
     * const DentalHistory = await prisma.dentalHistory.create({
     *   data: {
     *     // ... data to create a DentalHistory
     *   }
     * })
     * 
     */
    create<T extends DentalHistoryCreateArgs>(args: SelectSubset<T, DentalHistoryCreateArgs<ExtArgs>>): Prisma__DentalHistoryClient<$Result.GetResult<Prisma.$DentalHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DentalHistories.
     * @param {DentalHistoryCreateManyArgs} args - Arguments to create many DentalHistories.
     * @example
     * // Create many DentalHistories
     * const dentalHistory = await prisma.dentalHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DentalHistoryCreateManyArgs>(args?: SelectSubset<T, DentalHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DentalHistories and returns the data saved in the database.
     * @param {DentalHistoryCreateManyAndReturnArgs} args - Arguments to create many DentalHistories.
     * @example
     * // Create many DentalHistories
     * const dentalHistory = await prisma.dentalHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DentalHistories and only return the `id`
     * const dentalHistoryWithIdOnly = await prisma.dentalHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DentalHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, DentalHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DentalHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DentalHistory.
     * @param {DentalHistoryDeleteArgs} args - Arguments to delete one DentalHistory.
     * @example
     * // Delete one DentalHistory
     * const DentalHistory = await prisma.dentalHistory.delete({
     *   where: {
     *     // ... filter to delete one DentalHistory
     *   }
     * })
     * 
     */
    delete<T extends DentalHistoryDeleteArgs>(args: SelectSubset<T, DentalHistoryDeleteArgs<ExtArgs>>): Prisma__DentalHistoryClient<$Result.GetResult<Prisma.$DentalHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DentalHistory.
     * @param {DentalHistoryUpdateArgs} args - Arguments to update one DentalHistory.
     * @example
     * // Update one DentalHistory
     * const dentalHistory = await prisma.dentalHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DentalHistoryUpdateArgs>(args: SelectSubset<T, DentalHistoryUpdateArgs<ExtArgs>>): Prisma__DentalHistoryClient<$Result.GetResult<Prisma.$DentalHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DentalHistories.
     * @param {DentalHistoryDeleteManyArgs} args - Arguments to filter DentalHistories to delete.
     * @example
     * // Delete a few DentalHistories
     * const { count } = await prisma.dentalHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DentalHistoryDeleteManyArgs>(args?: SelectSubset<T, DentalHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DentalHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DentalHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DentalHistories
     * const dentalHistory = await prisma.dentalHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DentalHistoryUpdateManyArgs>(args: SelectSubset<T, DentalHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DentalHistories and returns the data updated in the database.
     * @param {DentalHistoryUpdateManyAndReturnArgs} args - Arguments to update many DentalHistories.
     * @example
     * // Update many DentalHistories
     * const dentalHistory = await prisma.dentalHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DentalHistories and only return the `id`
     * const dentalHistoryWithIdOnly = await prisma.dentalHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DentalHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, DentalHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DentalHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DentalHistory.
     * @param {DentalHistoryUpsertArgs} args - Arguments to update or create a DentalHistory.
     * @example
     * // Update or create a DentalHistory
     * const dentalHistory = await prisma.dentalHistory.upsert({
     *   create: {
     *     // ... data to create a DentalHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DentalHistory we want to update
     *   }
     * })
     */
    upsert<T extends DentalHistoryUpsertArgs>(args: SelectSubset<T, DentalHistoryUpsertArgs<ExtArgs>>): Prisma__DentalHistoryClient<$Result.GetResult<Prisma.$DentalHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DentalHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DentalHistoryCountArgs} args - Arguments to filter DentalHistories to count.
     * @example
     * // Count the number of DentalHistories
     * const count = await prisma.dentalHistory.count({
     *   where: {
     *     // ... the filter for the DentalHistories we want to count
     *   }
     * })
    **/
    count<T extends DentalHistoryCountArgs>(
      args?: Subset<T, DentalHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DentalHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DentalHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DentalHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DentalHistoryAggregateArgs>(args: Subset<T, DentalHistoryAggregateArgs>): Prisma.PrismaPromise<GetDentalHistoryAggregateType<T>>

    /**
     * Group by DentalHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DentalHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DentalHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DentalHistoryGroupByArgs['orderBy'] }
        : { orderBy?: DentalHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DentalHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDentalHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DentalHistory model
   */
  readonly fields: DentalHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DentalHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DentalHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientProfileDefaultArgs<ExtArgs>>): Prisma__PatientProfileClient<$Result.GetResult<Prisma.$PatientProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    appointment<T extends DentalHistory$appointmentArgs<ExtArgs> = {}>(args?: Subset<T, DentalHistory$appointmentArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DentalHistory model
   */
  interface DentalHistoryFieldRefs {
    readonly id: FieldRef<"DentalHistory", 'String'>
    readonly patientId: FieldRef<"DentalHistory", 'String'>
    readonly appointmentId: FieldRef<"DentalHistory", 'String'>
    readonly treatmentType: FieldRef<"DentalHistory", 'String'>
    readonly treatmentStatus: FieldRef<"DentalHistory", 'TreatmentStatus'>
    readonly paymentStatus: FieldRef<"DentalHistory", 'PaymentStatus'>
    readonly date: FieldRef<"DentalHistory", 'DateTime'>
    readonly notes: FieldRef<"DentalHistory", 'String'>
    readonly createdAt: FieldRef<"DentalHistory", 'DateTime'>
    readonly updatedAt: FieldRef<"DentalHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DentalHistory findUnique
   */
  export type DentalHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DentalHistory
     */
    select?: DentalHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DentalHistory
     */
    omit?: DentalHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentalHistoryInclude<ExtArgs> | null
    /**
     * Filter, which DentalHistory to fetch.
     */
    where: DentalHistoryWhereUniqueInput
  }

  /**
   * DentalHistory findUniqueOrThrow
   */
  export type DentalHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DentalHistory
     */
    select?: DentalHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DentalHistory
     */
    omit?: DentalHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentalHistoryInclude<ExtArgs> | null
    /**
     * Filter, which DentalHistory to fetch.
     */
    where: DentalHistoryWhereUniqueInput
  }

  /**
   * DentalHistory findFirst
   */
  export type DentalHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DentalHistory
     */
    select?: DentalHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DentalHistory
     */
    omit?: DentalHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentalHistoryInclude<ExtArgs> | null
    /**
     * Filter, which DentalHistory to fetch.
     */
    where?: DentalHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DentalHistories to fetch.
     */
    orderBy?: DentalHistoryOrderByWithRelationInput | DentalHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DentalHistories.
     */
    cursor?: DentalHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DentalHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DentalHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DentalHistories.
     */
    distinct?: DentalHistoryScalarFieldEnum | DentalHistoryScalarFieldEnum[]
  }

  /**
   * DentalHistory findFirstOrThrow
   */
  export type DentalHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DentalHistory
     */
    select?: DentalHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DentalHistory
     */
    omit?: DentalHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentalHistoryInclude<ExtArgs> | null
    /**
     * Filter, which DentalHistory to fetch.
     */
    where?: DentalHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DentalHistories to fetch.
     */
    orderBy?: DentalHistoryOrderByWithRelationInput | DentalHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DentalHistories.
     */
    cursor?: DentalHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DentalHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DentalHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DentalHistories.
     */
    distinct?: DentalHistoryScalarFieldEnum | DentalHistoryScalarFieldEnum[]
  }

  /**
   * DentalHistory findMany
   */
  export type DentalHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DentalHistory
     */
    select?: DentalHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DentalHistory
     */
    omit?: DentalHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentalHistoryInclude<ExtArgs> | null
    /**
     * Filter, which DentalHistories to fetch.
     */
    where?: DentalHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DentalHistories to fetch.
     */
    orderBy?: DentalHistoryOrderByWithRelationInput | DentalHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DentalHistories.
     */
    cursor?: DentalHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DentalHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DentalHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DentalHistories.
     */
    distinct?: DentalHistoryScalarFieldEnum | DentalHistoryScalarFieldEnum[]
  }

  /**
   * DentalHistory create
   */
  export type DentalHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DentalHistory
     */
    select?: DentalHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DentalHistory
     */
    omit?: DentalHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentalHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a DentalHistory.
     */
    data: XOR<DentalHistoryCreateInput, DentalHistoryUncheckedCreateInput>
  }

  /**
   * DentalHistory createMany
   */
  export type DentalHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DentalHistories.
     */
    data: DentalHistoryCreateManyInput | DentalHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DentalHistory createManyAndReturn
   */
  export type DentalHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DentalHistory
     */
    select?: DentalHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DentalHistory
     */
    omit?: DentalHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many DentalHistories.
     */
    data: DentalHistoryCreateManyInput | DentalHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentalHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DentalHistory update
   */
  export type DentalHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DentalHistory
     */
    select?: DentalHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DentalHistory
     */
    omit?: DentalHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentalHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a DentalHistory.
     */
    data: XOR<DentalHistoryUpdateInput, DentalHistoryUncheckedUpdateInput>
    /**
     * Choose, which DentalHistory to update.
     */
    where: DentalHistoryWhereUniqueInput
  }

  /**
   * DentalHistory updateMany
   */
  export type DentalHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DentalHistories.
     */
    data: XOR<DentalHistoryUpdateManyMutationInput, DentalHistoryUncheckedUpdateManyInput>
    /**
     * Filter which DentalHistories to update
     */
    where?: DentalHistoryWhereInput
    /**
     * Limit how many DentalHistories to update.
     */
    limit?: number
  }

  /**
   * DentalHistory updateManyAndReturn
   */
  export type DentalHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DentalHistory
     */
    select?: DentalHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DentalHistory
     */
    omit?: DentalHistoryOmit<ExtArgs> | null
    /**
     * The data used to update DentalHistories.
     */
    data: XOR<DentalHistoryUpdateManyMutationInput, DentalHistoryUncheckedUpdateManyInput>
    /**
     * Filter which DentalHistories to update
     */
    where?: DentalHistoryWhereInput
    /**
     * Limit how many DentalHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentalHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DentalHistory upsert
   */
  export type DentalHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DentalHistory
     */
    select?: DentalHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DentalHistory
     */
    omit?: DentalHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentalHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the DentalHistory to update in case it exists.
     */
    where: DentalHistoryWhereUniqueInput
    /**
     * In case the DentalHistory found by the `where` argument doesn't exist, create a new DentalHistory with this data.
     */
    create: XOR<DentalHistoryCreateInput, DentalHistoryUncheckedCreateInput>
    /**
     * In case the DentalHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DentalHistoryUpdateInput, DentalHistoryUncheckedUpdateInput>
  }

  /**
   * DentalHistory delete
   */
  export type DentalHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DentalHistory
     */
    select?: DentalHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DentalHistory
     */
    omit?: DentalHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentalHistoryInclude<ExtArgs> | null
    /**
     * Filter which DentalHistory to delete.
     */
    where: DentalHistoryWhereUniqueInput
  }

  /**
   * DentalHistory deleteMany
   */
  export type DentalHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DentalHistories to delete
     */
    where?: DentalHistoryWhereInput
    /**
     * Limit how many DentalHistories to delete.
     */
    limit?: number
  }

  /**
   * DentalHistory.appointment
   */
  export type DentalHistory$appointmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
  }

  /**
   * DentalHistory without action
   */
  export type DentalHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DentalHistory
     */
    select?: DentalHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DentalHistory
     */
    omit?: DentalHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DentalHistoryInclude<ExtArgs> | null
  }


  /**
   * Model MedicalDocument
   */

  export type AggregateMedicalDocument = {
    _count: MedicalDocumentCountAggregateOutputType | null
    _avg: MedicalDocumentAvgAggregateOutputType | null
    _sum: MedicalDocumentSumAggregateOutputType | null
    _min: MedicalDocumentMinAggregateOutputType | null
    _max: MedicalDocumentMaxAggregateOutputType | null
  }

  export type MedicalDocumentAvgAggregateOutputType = {
    sizeBytes: number | null
  }

  export type MedicalDocumentSumAggregateOutputType = {
    sizeBytes: number | null
  }

  export type MedicalDocumentMinAggregateOutputType = {
    id: string | null
    patientId: string | null
    name: string | null
    fileUrl: string | null
    sizeBytes: number | null
    type: string | null
    uploadedAt: Date | null
  }

  export type MedicalDocumentMaxAggregateOutputType = {
    id: string | null
    patientId: string | null
    name: string | null
    fileUrl: string | null
    sizeBytes: number | null
    type: string | null
    uploadedAt: Date | null
  }

  export type MedicalDocumentCountAggregateOutputType = {
    id: number
    patientId: number
    name: number
    fileUrl: number
    sizeBytes: number
    type: number
    uploadedAt: number
    _all: number
  }


  export type MedicalDocumentAvgAggregateInputType = {
    sizeBytes?: true
  }

  export type MedicalDocumentSumAggregateInputType = {
    sizeBytes?: true
  }

  export type MedicalDocumentMinAggregateInputType = {
    id?: true
    patientId?: true
    name?: true
    fileUrl?: true
    sizeBytes?: true
    type?: true
    uploadedAt?: true
  }

  export type MedicalDocumentMaxAggregateInputType = {
    id?: true
    patientId?: true
    name?: true
    fileUrl?: true
    sizeBytes?: true
    type?: true
    uploadedAt?: true
  }

  export type MedicalDocumentCountAggregateInputType = {
    id?: true
    patientId?: true
    name?: true
    fileUrl?: true
    sizeBytes?: true
    type?: true
    uploadedAt?: true
    _all?: true
  }

  export type MedicalDocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MedicalDocument to aggregate.
     */
    where?: MedicalDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalDocuments to fetch.
     */
    orderBy?: MedicalDocumentOrderByWithRelationInput | MedicalDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MedicalDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MedicalDocuments
    **/
    _count?: true | MedicalDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MedicalDocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MedicalDocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MedicalDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MedicalDocumentMaxAggregateInputType
  }

  export type GetMedicalDocumentAggregateType<T extends MedicalDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateMedicalDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedicalDocument[P]>
      : GetScalarType<T[P], AggregateMedicalDocument[P]>
  }




  export type MedicalDocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicalDocumentWhereInput
    orderBy?: MedicalDocumentOrderByWithAggregationInput | MedicalDocumentOrderByWithAggregationInput[]
    by: MedicalDocumentScalarFieldEnum[] | MedicalDocumentScalarFieldEnum
    having?: MedicalDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MedicalDocumentCountAggregateInputType | true
    _avg?: MedicalDocumentAvgAggregateInputType
    _sum?: MedicalDocumentSumAggregateInputType
    _min?: MedicalDocumentMinAggregateInputType
    _max?: MedicalDocumentMaxAggregateInputType
  }

  export type MedicalDocumentGroupByOutputType = {
    id: string
    patientId: string
    name: string
    fileUrl: string
    sizeBytes: number
    type: string
    uploadedAt: Date
    _count: MedicalDocumentCountAggregateOutputType | null
    _avg: MedicalDocumentAvgAggregateOutputType | null
    _sum: MedicalDocumentSumAggregateOutputType | null
    _min: MedicalDocumentMinAggregateOutputType | null
    _max: MedicalDocumentMaxAggregateOutputType | null
  }

  type GetMedicalDocumentGroupByPayload<T extends MedicalDocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MedicalDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MedicalDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MedicalDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], MedicalDocumentGroupByOutputType[P]>
        }
      >
    >


  export type MedicalDocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    name?: boolean
    fileUrl?: boolean
    sizeBytes?: boolean
    type?: boolean
    uploadedAt?: boolean
    patient?: boolean | PatientProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicalDocument"]>

  export type MedicalDocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    name?: boolean
    fileUrl?: boolean
    sizeBytes?: boolean
    type?: boolean
    uploadedAt?: boolean
    patient?: boolean | PatientProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicalDocument"]>

  export type MedicalDocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    name?: boolean
    fileUrl?: boolean
    sizeBytes?: boolean
    type?: boolean
    uploadedAt?: boolean
    patient?: boolean | PatientProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicalDocument"]>

  export type MedicalDocumentSelectScalar = {
    id?: boolean
    patientId?: boolean
    name?: boolean
    fileUrl?: boolean
    sizeBytes?: boolean
    type?: boolean
    uploadedAt?: boolean
  }

  export type MedicalDocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "patientId" | "name" | "fileUrl" | "sizeBytes" | "type" | "uploadedAt", ExtArgs["result"]["medicalDocument"]>
  export type MedicalDocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientProfileDefaultArgs<ExtArgs>
  }
  export type MedicalDocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientProfileDefaultArgs<ExtArgs>
  }
  export type MedicalDocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientProfileDefaultArgs<ExtArgs>
  }

  export type $MedicalDocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MedicalDocument"
    objects: {
      patient: Prisma.$PatientProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      patientId: string
      name: string
      fileUrl: string
      sizeBytes: number
      type: string
      uploadedAt: Date
    }, ExtArgs["result"]["medicalDocument"]>
    composites: {}
  }

  type MedicalDocumentGetPayload<S extends boolean | null | undefined | MedicalDocumentDefaultArgs> = $Result.GetResult<Prisma.$MedicalDocumentPayload, S>

  type MedicalDocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MedicalDocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MedicalDocumentCountAggregateInputType | true
    }

  export interface MedicalDocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MedicalDocument'], meta: { name: 'MedicalDocument' } }
    /**
     * Find zero or one MedicalDocument that matches the filter.
     * @param {MedicalDocumentFindUniqueArgs} args - Arguments to find a MedicalDocument
     * @example
     * // Get one MedicalDocument
     * const medicalDocument = await prisma.medicalDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MedicalDocumentFindUniqueArgs>(args: SelectSubset<T, MedicalDocumentFindUniqueArgs<ExtArgs>>): Prisma__MedicalDocumentClient<$Result.GetResult<Prisma.$MedicalDocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MedicalDocument that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MedicalDocumentFindUniqueOrThrowArgs} args - Arguments to find a MedicalDocument
     * @example
     * // Get one MedicalDocument
     * const medicalDocument = await prisma.medicalDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MedicalDocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, MedicalDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MedicalDocumentClient<$Result.GetResult<Prisma.$MedicalDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MedicalDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalDocumentFindFirstArgs} args - Arguments to find a MedicalDocument
     * @example
     * // Get one MedicalDocument
     * const medicalDocument = await prisma.medicalDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MedicalDocumentFindFirstArgs>(args?: SelectSubset<T, MedicalDocumentFindFirstArgs<ExtArgs>>): Prisma__MedicalDocumentClient<$Result.GetResult<Prisma.$MedicalDocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MedicalDocument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalDocumentFindFirstOrThrowArgs} args - Arguments to find a MedicalDocument
     * @example
     * // Get one MedicalDocument
     * const medicalDocument = await prisma.medicalDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MedicalDocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, MedicalDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__MedicalDocumentClient<$Result.GetResult<Prisma.$MedicalDocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MedicalDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalDocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MedicalDocuments
     * const medicalDocuments = await prisma.medicalDocument.findMany()
     * 
     * // Get first 10 MedicalDocuments
     * const medicalDocuments = await prisma.medicalDocument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const medicalDocumentWithIdOnly = await prisma.medicalDocument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MedicalDocumentFindManyArgs>(args?: SelectSubset<T, MedicalDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MedicalDocument.
     * @param {MedicalDocumentCreateArgs} args - Arguments to create a MedicalDocument.
     * @example
     * // Create one MedicalDocument
     * const MedicalDocument = await prisma.medicalDocument.create({
     *   data: {
     *     // ... data to create a MedicalDocument
     *   }
     * })
     * 
     */
    create<T extends MedicalDocumentCreateArgs>(args: SelectSubset<T, MedicalDocumentCreateArgs<ExtArgs>>): Prisma__MedicalDocumentClient<$Result.GetResult<Prisma.$MedicalDocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MedicalDocuments.
     * @param {MedicalDocumentCreateManyArgs} args - Arguments to create many MedicalDocuments.
     * @example
     * // Create many MedicalDocuments
     * const medicalDocument = await prisma.medicalDocument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MedicalDocumentCreateManyArgs>(args?: SelectSubset<T, MedicalDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MedicalDocuments and returns the data saved in the database.
     * @param {MedicalDocumentCreateManyAndReturnArgs} args - Arguments to create many MedicalDocuments.
     * @example
     * // Create many MedicalDocuments
     * const medicalDocument = await prisma.medicalDocument.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MedicalDocuments and only return the `id`
     * const medicalDocumentWithIdOnly = await prisma.medicalDocument.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MedicalDocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, MedicalDocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalDocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MedicalDocument.
     * @param {MedicalDocumentDeleteArgs} args - Arguments to delete one MedicalDocument.
     * @example
     * // Delete one MedicalDocument
     * const MedicalDocument = await prisma.medicalDocument.delete({
     *   where: {
     *     // ... filter to delete one MedicalDocument
     *   }
     * })
     * 
     */
    delete<T extends MedicalDocumentDeleteArgs>(args: SelectSubset<T, MedicalDocumentDeleteArgs<ExtArgs>>): Prisma__MedicalDocumentClient<$Result.GetResult<Prisma.$MedicalDocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MedicalDocument.
     * @param {MedicalDocumentUpdateArgs} args - Arguments to update one MedicalDocument.
     * @example
     * // Update one MedicalDocument
     * const medicalDocument = await prisma.medicalDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MedicalDocumentUpdateArgs>(args: SelectSubset<T, MedicalDocumentUpdateArgs<ExtArgs>>): Prisma__MedicalDocumentClient<$Result.GetResult<Prisma.$MedicalDocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MedicalDocuments.
     * @param {MedicalDocumentDeleteManyArgs} args - Arguments to filter MedicalDocuments to delete.
     * @example
     * // Delete a few MedicalDocuments
     * const { count } = await prisma.medicalDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MedicalDocumentDeleteManyArgs>(args?: SelectSubset<T, MedicalDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MedicalDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MedicalDocuments
     * const medicalDocument = await prisma.medicalDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MedicalDocumentUpdateManyArgs>(args: SelectSubset<T, MedicalDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MedicalDocuments and returns the data updated in the database.
     * @param {MedicalDocumentUpdateManyAndReturnArgs} args - Arguments to update many MedicalDocuments.
     * @example
     * // Update many MedicalDocuments
     * const medicalDocument = await prisma.medicalDocument.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MedicalDocuments and only return the `id`
     * const medicalDocumentWithIdOnly = await prisma.medicalDocument.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MedicalDocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, MedicalDocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalDocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MedicalDocument.
     * @param {MedicalDocumentUpsertArgs} args - Arguments to update or create a MedicalDocument.
     * @example
     * // Update or create a MedicalDocument
     * const medicalDocument = await prisma.medicalDocument.upsert({
     *   create: {
     *     // ... data to create a MedicalDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MedicalDocument we want to update
     *   }
     * })
     */
    upsert<T extends MedicalDocumentUpsertArgs>(args: SelectSubset<T, MedicalDocumentUpsertArgs<ExtArgs>>): Prisma__MedicalDocumentClient<$Result.GetResult<Prisma.$MedicalDocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MedicalDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalDocumentCountArgs} args - Arguments to filter MedicalDocuments to count.
     * @example
     * // Count the number of MedicalDocuments
     * const count = await prisma.medicalDocument.count({
     *   where: {
     *     // ... the filter for the MedicalDocuments we want to count
     *   }
     * })
    **/
    count<T extends MedicalDocumentCountArgs>(
      args?: Subset<T, MedicalDocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MedicalDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MedicalDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MedicalDocumentAggregateArgs>(args: Subset<T, MedicalDocumentAggregateArgs>): Prisma.PrismaPromise<GetMedicalDocumentAggregateType<T>>

    /**
     * Group by MedicalDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalDocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MedicalDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MedicalDocumentGroupByArgs['orderBy'] }
        : { orderBy?: MedicalDocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MedicalDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMedicalDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MedicalDocument model
   */
  readonly fields: MedicalDocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MedicalDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MedicalDocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientProfileDefaultArgs<ExtArgs>>): Prisma__PatientProfileClient<$Result.GetResult<Prisma.$PatientProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MedicalDocument model
   */
  interface MedicalDocumentFieldRefs {
    readonly id: FieldRef<"MedicalDocument", 'String'>
    readonly patientId: FieldRef<"MedicalDocument", 'String'>
    readonly name: FieldRef<"MedicalDocument", 'String'>
    readonly fileUrl: FieldRef<"MedicalDocument", 'String'>
    readonly sizeBytes: FieldRef<"MedicalDocument", 'Int'>
    readonly type: FieldRef<"MedicalDocument", 'String'>
    readonly uploadedAt: FieldRef<"MedicalDocument", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MedicalDocument findUnique
   */
  export type MedicalDocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDocument
     */
    select?: MedicalDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDocument
     */
    omit?: MedicalDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDocumentInclude<ExtArgs> | null
    /**
     * Filter, which MedicalDocument to fetch.
     */
    where: MedicalDocumentWhereUniqueInput
  }

  /**
   * MedicalDocument findUniqueOrThrow
   */
  export type MedicalDocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDocument
     */
    select?: MedicalDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDocument
     */
    omit?: MedicalDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDocumentInclude<ExtArgs> | null
    /**
     * Filter, which MedicalDocument to fetch.
     */
    where: MedicalDocumentWhereUniqueInput
  }

  /**
   * MedicalDocument findFirst
   */
  export type MedicalDocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDocument
     */
    select?: MedicalDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDocument
     */
    omit?: MedicalDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDocumentInclude<ExtArgs> | null
    /**
     * Filter, which MedicalDocument to fetch.
     */
    where?: MedicalDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalDocuments to fetch.
     */
    orderBy?: MedicalDocumentOrderByWithRelationInput | MedicalDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MedicalDocuments.
     */
    cursor?: MedicalDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MedicalDocuments.
     */
    distinct?: MedicalDocumentScalarFieldEnum | MedicalDocumentScalarFieldEnum[]
  }

  /**
   * MedicalDocument findFirstOrThrow
   */
  export type MedicalDocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDocument
     */
    select?: MedicalDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDocument
     */
    omit?: MedicalDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDocumentInclude<ExtArgs> | null
    /**
     * Filter, which MedicalDocument to fetch.
     */
    where?: MedicalDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalDocuments to fetch.
     */
    orderBy?: MedicalDocumentOrderByWithRelationInput | MedicalDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MedicalDocuments.
     */
    cursor?: MedicalDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MedicalDocuments.
     */
    distinct?: MedicalDocumentScalarFieldEnum | MedicalDocumentScalarFieldEnum[]
  }

  /**
   * MedicalDocument findMany
   */
  export type MedicalDocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDocument
     */
    select?: MedicalDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDocument
     */
    omit?: MedicalDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDocumentInclude<ExtArgs> | null
    /**
     * Filter, which MedicalDocuments to fetch.
     */
    where?: MedicalDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalDocuments to fetch.
     */
    orderBy?: MedicalDocumentOrderByWithRelationInput | MedicalDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MedicalDocuments.
     */
    cursor?: MedicalDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MedicalDocuments.
     */
    distinct?: MedicalDocumentScalarFieldEnum | MedicalDocumentScalarFieldEnum[]
  }

  /**
   * MedicalDocument create
   */
  export type MedicalDocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDocument
     */
    select?: MedicalDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDocument
     */
    omit?: MedicalDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a MedicalDocument.
     */
    data: XOR<MedicalDocumentCreateInput, MedicalDocumentUncheckedCreateInput>
  }

  /**
   * MedicalDocument createMany
   */
  export type MedicalDocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MedicalDocuments.
     */
    data: MedicalDocumentCreateManyInput | MedicalDocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MedicalDocument createManyAndReturn
   */
  export type MedicalDocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDocument
     */
    select?: MedicalDocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDocument
     */
    omit?: MedicalDocumentOmit<ExtArgs> | null
    /**
     * The data used to create many MedicalDocuments.
     */
    data: MedicalDocumentCreateManyInput | MedicalDocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MedicalDocument update
   */
  export type MedicalDocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDocument
     */
    select?: MedicalDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDocument
     */
    omit?: MedicalDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a MedicalDocument.
     */
    data: XOR<MedicalDocumentUpdateInput, MedicalDocumentUncheckedUpdateInput>
    /**
     * Choose, which MedicalDocument to update.
     */
    where: MedicalDocumentWhereUniqueInput
  }

  /**
   * MedicalDocument updateMany
   */
  export type MedicalDocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MedicalDocuments.
     */
    data: XOR<MedicalDocumentUpdateManyMutationInput, MedicalDocumentUncheckedUpdateManyInput>
    /**
     * Filter which MedicalDocuments to update
     */
    where?: MedicalDocumentWhereInput
    /**
     * Limit how many MedicalDocuments to update.
     */
    limit?: number
  }

  /**
   * MedicalDocument updateManyAndReturn
   */
  export type MedicalDocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDocument
     */
    select?: MedicalDocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDocument
     */
    omit?: MedicalDocumentOmit<ExtArgs> | null
    /**
     * The data used to update MedicalDocuments.
     */
    data: XOR<MedicalDocumentUpdateManyMutationInput, MedicalDocumentUncheckedUpdateManyInput>
    /**
     * Filter which MedicalDocuments to update
     */
    where?: MedicalDocumentWhereInput
    /**
     * Limit how many MedicalDocuments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MedicalDocument upsert
   */
  export type MedicalDocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDocument
     */
    select?: MedicalDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDocument
     */
    omit?: MedicalDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the MedicalDocument to update in case it exists.
     */
    where: MedicalDocumentWhereUniqueInput
    /**
     * In case the MedicalDocument found by the `where` argument doesn't exist, create a new MedicalDocument with this data.
     */
    create: XOR<MedicalDocumentCreateInput, MedicalDocumentUncheckedCreateInput>
    /**
     * In case the MedicalDocument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MedicalDocumentUpdateInput, MedicalDocumentUncheckedUpdateInput>
  }

  /**
   * MedicalDocument delete
   */
  export type MedicalDocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDocument
     */
    select?: MedicalDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDocument
     */
    omit?: MedicalDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDocumentInclude<ExtArgs> | null
    /**
     * Filter which MedicalDocument to delete.
     */
    where: MedicalDocumentWhereUniqueInput
  }

  /**
   * MedicalDocument deleteMany
   */
  export type MedicalDocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MedicalDocuments to delete
     */
    where?: MedicalDocumentWhereInput
    /**
     * Limit how many MedicalDocuments to delete.
     */
    limit?: number
  }

  /**
   * MedicalDocument without action
   */
  export type MedicalDocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalDocument
     */
    select?: MedicalDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalDocument
     */
    omit?: MedicalDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalDocumentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    phone: 'phone',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const EmployeeProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    position: 'position',
    department: 'department',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmployeeProfileScalarFieldEnum = (typeof EmployeeProfileScalarFieldEnum)[keyof typeof EmployeeProfileScalarFieldEnum]


  export const PatientProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    address: 'address',
    gender: 'gender',
    dateOfBirth: 'dateOfBirth',
    emergencyContactName: 'emergencyContactName',
    emergencyContactPhone: 'emergencyContactPhone',
    insuranceProvider: 'insuranceProvider',
    insuranceNumber: 'insuranceNumber',
    bloodType: 'bloodType',
    height: 'height',
    weight: 'weight',
    bloodPressure: 'bloodPressure',
    heartRate: 'heartRate',
    bloodSugarLevel: 'bloodSugarLevel',
    allergies: 'allergies',
    medications: 'medications',
    chronicDiseases: 'chronicDiseases',
    medicalHistory: 'medicalHistory',
    lastDentalVisit: 'lastDentalVisit',
    gumCondition: 'gumCondition',
    toothDecay: 'toothDecay',
    missingTeethCount: 'missingTeethCount',
    prostheticsUsed: 'prostheticsUsed',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PatientProfileScalarFieldEnum = (typeof PatientProfileScalarFieldEnum)[keyof typeof PatientProfileScalarFieldEnum]


  export const AppointmentScalarFieldEnum: {
    id: 'id',
    patientId: 'patientId',
    guestFirstName: 'guestFirstName',
    guestLastName: 'guestLastName',
    guestEmail: 'guestEmail',
    guestPhone: 'guestPhone',
    doctorId: 'doctorId',
    date: 'date',
    time: 'time',
    reason: 'reason',
    notes: 'notes',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum]


  export const DentalHistoryScalarFieldEnum: {
    id: 'id',
    patientId: 'patientId',
    appointmentId: 'appointmentId',
    treatmentType: 'treatmentType',
    treatmentStatus: 'treatmentStatus',
    paymentStatus: 'paymentStatus',
    date: 'date',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DentalHistoryScalarFieldEnum = (typeof DentalHistoryScalarFieldEnum)[keyof typeof DentalHistoryScalarFieldEnum]


  export const MedicalDocumentScalarFieldEnum: {
    id: 'id',
    patientId: 'patientId',
    name: 'name',
    fileUrl: 'fileUrl',
    sizeBytes: 'sizeBytes',
    type: 'type',
    uploadedAt: 'uploadedAt'
  };

  export type MedicalDocumentScalarFieldEnum = (typeof MedicalDocumentScalarFieldEnum)[keyof typeof MedicalDocumentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'BloodType'
   */
  export type EnumBloodTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BloodType'>
    


  /**
   * Reference to a field of type 'BloodType[]'
   */
  export type ListEnumBloodTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BloodType[]'>
    


  /**
   * Reference to a field of type 'GumCondition'
   */
  export type EnumGumConditionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GumCondition'>
    


  /**
   * Reference to a field of type 'GumCondition[]'
   */
  export type ListEnumGumConditionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GumCondition[]'>
    


  /**
   * Reference to a field of type 'AppointmentStatus'
   */
  export type EnumAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentStatus'>
    


  /**
   * Reference to a field of type 'AppointmentStatus[]'
   */
  export type ListEnumAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentStatus[]'>
    


  /**
   * Reference to a field of type 'TreatmentStatus'
   */
  export type EnumTreatmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TreatmentStatus'>
    


  /**
   * Reference to a field of type 'TreatmentStatus[]'
   */
  export type ListEnumTreatmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TreatmentStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    patientProfile?: XOR<PatientProfileNullableScalarRelationFilter, PatientProfileWhereInput> | null
    employeeProfile?: XOR<EmployeeProfileNullableScalarRelationFilter, EmployeeProfileWhereInput> | null
    doctorAppointments?: AppointmentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientProfile?: PatientProfileOrderByWithRelationInput
    employeeProfile?: EmployeeProfileOrderByWithRelationInput
    doctorAppointments?: AppointmentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    patientProfile?: XOR<PatientProfileNullableScalarRelationFilter, PatientProfileWhereInput> | null
    employeeProfile?: XOR<EmployeeProfileNullableScalarRelationFilter, EmployeeProfileWhereInput> | null
    doctorAppointments?: AppointmentListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type EmployeeProfileWhereInput = {
    AND?: EmployeeProfileWhereInput | EmployeeProfileWhereInput[]
    OR?: EmployeeProfileWhereInput[]
    NOT?: EmployeeProfileWhereInput | EmployeeProfileWhereInput[]
    id?: StringFilter<"EmployeeProfile"> | string
    userId?: StringFilter<"EmployeeProfile"> | string
    position?: StringFilter<"EmployeeProfile"> | string
    department?: StringFilter<"EmployeeProfile"> | string
    createdAt?: DateTimeFilter<"EmployeeProfile"> | Date | string
    updatedAt?: DateTimeFilter<"EmployeeProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type EmployeeProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    position?: SortOrder
    department?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type EmployeeProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: EmployeeProfileWhereInput | EmployeeProfileWhereInput[]
    OR?: EmployeeProfileWhereInput[]
    NOT?: EmployeeProfileWhereInput | EmployeeProfileWhereInput[]
    position?: StringFilter<"EmployeeProfile"> | string
    department?: StringFilter<"EmployeeProfile"> | string
    createdAt?: DateTimeFilter<"EmployeeProfile"> | Date | string
    updatedAt?: DateTimeFilter<"EmployeeProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type EmployeeProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    position?: SortOrder
    department?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmployeeProfileCountOrderByAggregateInput
    _max?: EmployeeProfileMaxOrderByAggregateInput
    _min?: EmployeeProfileMinOrderByAggregateInput
  }

  export type EmployeeProfileScalarWhereWithAggregatesInput = {
    AND?: EmployeeProfileScalarWhereWithAggregatesInput | EmployeeProfileScalarWhereWithAggregatesInput[]
    OR?: EmployeeProfileScalarWhereWithAggregatesInput[]
    NOT?: EmployeeProfileScalarWhereWithAggregatesInput | EmployeeProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmployeeProfile"> | string
    userId?: StringWithAggregatesFilter<"EmployeeProfile"> | string
    position?: StringWithAggregatesFilter<"EmployeeProfile"> | string
    department?: StringWithAggregatesFilter<"EmployeeProfile"> | string
    createdAt?: DateTimeWithAggregatesFilter<"EmployeeProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EmployeeProfile"> | Date | string
  }

  export type PatientProfileWhereInput = {
    AND?: PatientProfileWhereInput | PatientProfileWhereInput[]
    OR?: PatientProfileWhereInput[]
    NOT?: PatientProfileWhereInput | PatientProfileWhereInput[]
    id?: StringFilter<"PatientProfile"> | string
    userId?: StringFilter<"PatientProfile"> | string
    address?: StringNullableFilter<"PatientProfile"> | string | null
    gender?: EnumGenderNullableFilter<"PatientProfile"> | $Enums.Gender | null
    dateOfBirth?: DateTimeNullableFilter<"PatientProfile"> | Date | string | null
    emergencyContactName?: StringNullableFilter<"PatientProfile"> | string | null
    emergencyContactPhone?: StringNullableFilter<"PatientProfile"> | string | null
    insuranceProvider?: StringNullableFilter<"PatientProfile"> | string | null
    insuranceNumber?: StringNullableFilter<"PatientProfile"> | string | null
    bloodType?: EnumBloodTypeFilter<"PatientProfile"> | $Enums.BloodType
    height?: StringNullableFilter<"PatientProfile"> | string | null
    weight?: StringNullableFilter<"PatientProfile"> | string | null
    bloodPressure?: StringNullableFilter<"PatientProfile"> | string | null
    heartRate?: StringNullableFilter<"PatientProfile"> | string | null
    bloodSugarLevel?: StringNullableFilter<"PatientProfile"> | string | null
    allergies?: StringNullableFilter<"PatientProfile"> | string | null
    medications?: StringNullableFilter<"PatientProfile"> | string | null
    chronicDiseases?: StringNullableFilter<"PatientProfile"> | string | null
    medicalHistory?: StringNullableFilter<"PatientProfile"> | string | null
    lastDentalVisit?: DateTimeNullableFilter<"PatientProfile"> | Date | string | null
    gumCondition?: EnumGumConditionFilter<"PatientProfile"> | $Enums.GumCondition
    toothDecay?: StringNullableFilter<"PatientProfile"> | string | null
    missingTeethCount?: StringNullableFilter<"PatientProfile"> | string | null
    prostheticsUsed?: StringNullableFilter<"PatientProfile"> | string | null
    createdAt?: DateTimeFilter<"PatientProfile"> | Date | string
    updatedAt?: DateTimeFilter<"PatientProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    appointments?: AppointmentListRelationFilter
    dentalHistory?: DentalHistoryListRelationFilter
    medicalDocuments?: MedicalDocumentListRelationFilter
  }

  export type PatientProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    address?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    emergencyContactName?: SortOrderInput | SortOrder
    emergencyContactPhone?: SortOrderInput | SortOrder
    insuranceProvider?: SortOrderInput | SortOrder
    insuranceNumber?: SortOrderInput | SortOrder
    bloodType?: SortOrder
    height?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    bloodPressure?: SortOrderInput | SortOrder
    heartRate?: SortOrderInput | SortOrder
    bloodSugarLevel?: SortOrderInput | SortOrder
    allergies?: SortOrderInput | SortOrder
    medications?: SortOrderInput | SortOrder
    chronicDiseases?: SortOrderInput | SortOrder
    medicalHistory?: SortOrderInput | SortOrder
    lastDentalVisit?: SortOrderInput | SortOrder
    gumCondition?: SortOrder
    toothDecay?: SortOrderInput | SortOrder
    missingTeethCount?: SortOrderInput | SortOrder
    prostheticsUsed?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    appointments?: AppointmentOrderByRelationAggregateInput
    dentalHistory?: DentalHistoryOrderByRelationAggregateInput
    medicalDocuments?: MedicalDocumentOrderByRelationAggregateInput
  }

  export type PatientProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: PatientProfileWhereInput | PatientProfileWhereInput[]
    OR?: PatientProfileWhereInput[]
    NOT?: PatientProfileWhereInput | PatientProfileWhereInput[]
    address?: StringNullableFilter<"PatientProfile"> | string | null
    gender?: EnumGenderNullableFilter<"PatientProfile"> | $Enums.Gender | null
    dateOfBirth?: DateTimeNullableFilter<"PatientProfile"> | Date | string | null
    emergencyContactName?: StringNullableFilter<"PatientProfile"> | string | null
    emergencyContactPhone?: StringNullableFilter<"PatientProfile"> | string | null
    insuranceProvider?: StringNullableFilter<"PatientProfile"> | string | null
    insuranceNumber?: StringNullableFilter<"PatientProfile"> | string | null
    bloodType?: EnumBloodTypeFilter<"PatientProfile"> | $Enums.BloodType
    height?: StringNullableFilter<"PatientProfile"> | string | null
    weight?: StringNullableFilter<"PatientProfile"> | string | null
    bloodPressure?: StringNullableFilter<"PatientProfile"> | string | null
    heartRate?: StringNullableFilter<"PatientProfile"> | string | null
    bloodSugarLevel?: StringNullableFilter<"PatientProfile"> | string | null
    allergies?: StringNullableFilter<"PatientProfile"> | string | null
    medications?: StringNullableFilter<"PatientProfile"> | string | null
    chronicDiseases?: StringNullableFilter<"PatientProfile"> | string | null
    medicalHistory?: StringNullableFilter<"PatientProfile"> | string | null
    lastDentalVisit?: DateTimeNullableFilter<"PatientProfile"> | Date | string | null
    gumCondition?: EnumGumConditionFilter<"PatientProfile"> | $Enums.GumCondition
    toothDecay?: StringNullableFilter<"PatientProfile"> | string | null
    missingTeethCount?: StringNullableFilter<"PatientProfile"> | string | null
    prostheticsUsed?: StringNullableFilter<"PatientProfile"> | string | null
    createdAt?: DateTimeFilter<"PatientProfile"> | Date | string
    updatedAt?: DateTimeFilter<"PatientProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    appointments?: AppointmentListRelationFilter
    dentalHistory?: DentalHistoryListRelationFilter
    medicalDocuments?: MedicalDocumentListRelationFilter
  }, "id" | "userId">

  export type PatientProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    address?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    emergencyContactName?: SortOrderInput | SortOrder
    emergencyContactPhone?: SortOrderInput | SortOrder
    insuranceProvider?: SortOrderInput | SortOrder
    insuranceNumber?: SortOrderInput | SortOrder
    bloodType?: SortOrder
    height?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    bloodPressure?: SortOrderInput | SortOrder
    heartRate?: SortOrderInput | SortOrder
    bloodSugarLevel?: SortOrderInput | SortOrder
    allergies?: SortOrderInput | SortOrder
    medications?: SortOrderInput | SortOrder
    chronicDiseases?: SortOrderInput | SortOrder
    medicalHistory?: SortOrderInput | SortOrder
    lastDentalVisit?: SortOrderInput | SortOrder
    gumCondition?: SortOrder
    toothDecay?: SortOrderInput | SortOrder
    missingTeethCount?: SortOrderInput | SortOrder
    prostheticsUsed?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PatientProfileCountOrderByAggregateInput
    _max?: PatientProfileMaxOrderByAggregateInput
    _min?: PatientProfileMinOrderByAggregateInput
  }

  export type PatientProfileScalarWhereWithAggregatesInput = {
    AND?: PatientProfileScalarWhereWithAggregatesInput | PatientProfileScalarWhereWithAggregatesInput[]
    OR?: PatientProfileScalarWhereWithAggregatesInput[]
    NOT?: PatientProfileScalarWhereWithAggregatesInput | PatientProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PatientProfile"> | string
    userId?: StringWithAggregatesFilter<"PatientProfile"> | string
    address?: StringNullableWithAggregatesFilter<"PatientProfile"> | string | null
    gender?: EnumGenderNullableWithAggregatesFilter<"PatientProfile"> | $Enums.Gender | null
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"PatientProfile"> | Date | string | null
    emergencyContactName?: StringNullableWithAggregatesFilter<"PatientProfile"> | string | null
    emergencyContactPhone?: StringNullableWithAggregatesFilter<"PatientProfile"> | string | null
    insuranceProvider?: StringNullableWithAggregatesFilter<"PatientProfile"> | string | null
    insuranceNumber?: StringNullableWithAggregatesFilter<"PatientProfile"> | string | null
    bloodType?: EnumBloodTypeWithAggregatesFilter<"PatientProfile"> | $Enums.BloodType
    height?: StringNullableWithAggregatesFilter<"PatientProfile"> | string | null
    weight?: StringNullableWithAggregatesFilter<"PatientProfile"> | string | null
    bloodPressure?: StringNullableWithAggregatesFilter<"PatientProfile"> | string | null
    heartRate?: StringNullableWithAggregatesFilter<"PatientProfile"> | string | null
    bloodSugarLevel?: StringNullableWithAggregatesFilter<"PatientProfile"> | string | null
    allergies?: StringNullableWithAggregatesFilter<"PatientProfile"> | string | null
    medications?: StringNullableWithAggregatesFilter<"PatientProfile"> | string | null
    chronicDiseases?: StringNullableWithAggregatesFilter<"PatientProfile"> | string | null
    medicalHistory?: StringNullableWithAggregatesFilter<"PatientProfile"> | string | null
    lastDentalVisit?: DateTimeNullableWithAggregatesFilter<"PatientProfile"> | Date | string | null
    gumCondition?: EnumGumConditionWithAggregatesFilter<"PatientProfile"> | $Enums.GumCondition
    toothDecay?: StringNullableWithAggregatesFilter<"PatientProfile"> | string | null
    missingTeethCount?: StringNullableWithAggregatesFilter<"PatientProfile"> | string | null
    prostheticsUsed?: StringNullableWithAggregatesFilter<"PatientProfile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PatientProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PatientProfile"> | Date | string
  }

  export type AppointmentWhereInput = {
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    id?: StringFilter<"Appointment"> | string
    patientId?: StringNullableFilter<"Appointment"> | string | null
    guestFirstName?: StringNullableFilter<"Appointment"> | string | null
    guestLastName?: StringNullableFilter<"Appointment"> | string | null
    guestEmail?: StringNullableFilter<"Appointment"> | string | null
    guestPhone?: StringNullableFilter<"Appointment"> | string | null
    doctorId?: StringNullableFilter<"Appointment"> | string | null
    date?: DateTimeFilter<"Appointment"> | Date | string
    time?: StringFilter<"Appointment"> | string
    reason?: StringFilter<"Appointment"> | string
    notes?: StringNullableFilter<"Appointment"> | string | null
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    patient?: XOR<PatientProfileNullableScalarRelationFilter, PatientProfileWhereInput> | null
    doctor?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    dentalHistory?: XOR<DentalHistoryNullableScalarRelationFilter, DentalHistoryWhereInput> | null
  }

  export type AppointmentOrderByWithRelationInput = {
    id?: SortOrder
    patientId?: SortOrderInput | SortOrder
    guestFirstName?: SortOrderInput | SortOrder
    guestLastName?: SortOrderInput | SortOrder
    guestEmail?: SortOrderInput | SortOrder
    guestPhone?: SortOrderInput | SortOrder
    doctorId?: SortOrderInput | SortOrder
    date?: SortOrder
    time?: SortOrder
    reason?: SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patient?: PatientProfileOrderByWithRelationInput
    doctor?: UserOrderByWithRelationInput
    dentalHistory?: DentalHistoryOrderByWithRelationInput
  }

  export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    patientId?: StringNullableFilter<"Appointment"> | string | null
    guestFirstName?: StringNullableFilter<"Appointment"> | string | null
    guestLastName?: StringNullableFilter<"Appointment"> | string | null
    guestEmail?: StringNullableFilter<"Appointment"> | string | null
    guestPhone?: StringNullableFilter<"Appointment"> | string | null
    doctorId?: StringNullableFilter<"Appointment"> | string | null
    date?: DateTimeFilter<"Appointment"> | Date | string
    time?: StringFilter<"Appointment"> | string
    reason?: StringFilter<"Appointment"> | string
    notes?: StringNullableFilter<"Appointment"> | string | null
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    patient?: XOR<PatientProfileNullableScalarRelationFilter, PatientProfileWhereInput> | null
    doctor?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    dentalHistory?: XOR<DentalHistoryNullableScalarRelationFilter, DentalHistoryWhereInput> | null
  }, "id">

  export type AppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    patientId?: SortOrderInput | SortOrder
    guestFirstName?: SortOrderInput | SortOrder
    guestLastName?: SortOrderInput | SortOrder
    guestEmail?: SortOrderInput | SortOrder
    guestPhone?: SortOrderInput | SortOrder
    doctorId?: SortOrderInput | SortOrder
    date?: SortOrder
    time?: SortOrder
    reason?: SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AppointmentCountOrderByAggregateInput
    _max?: AppointmentMaxOrderByAggregateInput
    _min?: AppointmentMinOrderByAggregateInput
  }

  export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    OR?: AppointmentScalarWhereWithAggregatesInput[]
    NOT?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Appointment"> | string
    patientId?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    guestFirstName?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    guestLastName?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    guestEmail?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    guestPhone?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    doctorId?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    date?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    time?: StringWithAggregatesFilter<"Appointment"> | string
    reason?: StringWithAggregatesFilter<"Appointment"> | string
    notes?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    status?: EnumAppointmentStatusWithAggregatesFilter<"Appointment"> | $Enums.AppointmentStatus
    createdAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
  }

  export type DentalHistoryWhereInput = {
    AND?: DentalHistoryWhereInput | DentalHistoryWhereInput[]
    OR?: DentalHistoryWhereInput[]
    NOT?: DentalHistoryWhereInput | DentalHistoryWhereInput[]
    id?: StringFilter<"DentalHistory"> | string
    patientId?: StringFilter<"DentalHistory"> | string
    appointmentId?: StringNullableFilter<"DentalHistory"> | string | null
    treatmentType?: StringFilter<"DentalHistory"> | string
    treatmentStatus?: EnumTreatmentStatusFilter<"DentalHistory"> | $Enums.TreatmentStatus
    paymentStatus?: EnumPaymentStatusFilter<"DentalHistory"> | $Enums.PaymentStatus
    date?: DateTimeFilter<"DentalHistory"> | Date | string
    notes?: StringNullableFilter<"DentalHistory"> | string | null
    createdAt?: DateTimeFilter<"DentalHistory"> | Date | string
    updatedAt?: DateTimeFilter<"DentalHistory"> | Date | string
    patient?: XOR<PatientProfileScalarRelationFilter, PatientProfileWhereInput>
    appointment?: XOR<AppointmentNullableScalarRelationFilter, AppointmentWhereInput> | null
  }

  export type DentalHistoryOrderByWithRelationInput = {
    id?: SortOrder
    patientId?: SortOrder
    appointmentId?: SortOrderInput | SortOrder
    treatmentType?: SortOrder
    treatmentStatus?: SortOrder
    paymentStatus?: SortOrder
    date?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patient?: PatientProfileOrderByWithRelationInput
    appointment?: AppointmentOrderByWithRelationInput
  }

  export type DentalHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    appointmentId?: string
    AND?: DentalHistoryWhereInput | DentalHistoryWhereInput[]
    OR?: DentalHistoryWhereInput[]
    NOT?: DentalHistoryWhereInput | DentalHistoryWhereInput[]
    patientId?: StringFilter<"DentalHistory"> | string
    treatmentType?: StringFilter<"DentalHistory"> | string
    treatmentStatus?: EnumTreatmentStatusFilter<"DentalHistory"> | $Enums.TreatmentStatus
    paymentStatus?: EnumPaymentStatusFilter<"DentalHistory"> | $Enums.PaymentStatus
    date?: DateTimeFilter<"DentalHistory"> | Date | string
    notes?: StringNullableFilter<"DentalHistory"> | string | null
    createdAt?: DateTimeFilter<"DentalHistory"> | Date | string
    updatedAt?: DateTimeFilter<"DentalHistory"> | Date | string
    patient?: XOR<PatientProfileScalarRelationFilter, PatientProfileWhereInput>
    appointment?: XOR<AppointmentNullableScalarRelationFilter, AppointmentWhereInput> | null
  }, "id" | "appointmentId">

  export type DentalHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    patientId?: SortOrder
    appointmentId?: SortOrderInput | SortOrder
    treatmentType?: SortOrder
    treatmentStatus?: SortOrder
    paymentStatus?: SortOrder
    date?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DentalHistoryCountOrderByAggregateInput
    _max?: DentalHistoryMaxOrderByAggregateInput
    _min?: DentalHistoryMinOrderByAggregateInput
  }

  export type DentalHistoryScalarWhereWithAggregatesInput = {
    AND?: DentalHistoryScalarWhereWithAggregatesInput | DentalHistoryScalarWhereWithAggregatesInput[]
    OR?: DentalHistoryScalarWhereWithAggregatesInput[]
    NOT?: DentalHistoryScalarWhereWithAggregatesInput | DentalHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DentalHistory"> | string
    patientId?: StringWithAggregatesFilter<"DentalHistory"> | string
    appointmentId?: StringNullableWithAggregatesFilter<"DentalHistory"> | string | null
    treatmentType?: StringWithAggregatesFilter<"DentalHistory"> | string
    treatmentStatus?: EnumTreatmentStatusWithAggregatesFilter<"DentalHistory"> | $Enums.TreatmentStatus
    paymentStatus?: EnumPaymentStatusWithAggregatesFilter<"DentalHistory"> | $Enums.PaymentStatus
    date?: DateTimeWithAggregatesFilter<"DentalHistory"> | Date | string
    notes?: StringNullableWithAggregatesFilter<"DentalHistory"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DentalHistory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DentalHistory"> | Date | string
  }

  export type MedicalDocumentWhereInput = {
    AND?: MedicalDocumentWhereInput | MedicalDocumentWhereInput[]
    OR?: MedicalDocumentWhereInput[]
    NOT?: MedicalDocumentWhereInput | MedicalDocumentWhereInput[]
    id?: StringFilter<"MedicalDocument"> | string
    patientId?: StringFilter<"MedicalDocument"> | string
    name?: StringFilter<"MedicalDocument"> | string
    fileUrl?: StringFilter<"MedicalDocument"> | string
    sizeBytes?: IntFilter<"MedicalDocument"> | number
    type?: StringFilter<"MedicalDocument"> | string
    uploadedAt?: DateTimeFilter<"MedicalDocument"> | Date | string
    patient?: XOR<PatientProfileScalarRelationFilter, PatientProfileWhereInput>
  }

  export type MedicalDocumentOrderByWithRelationInput = {
    id?: SortOrder
    patientId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    sizeBytes?: SortOrder
    type?: SortOrder
    uploadedAt?: SortOrder
    patient?: PatientProfileOrderByWithRelationInput
  }

  export type MedicalDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MedicalDocumentWhereInput | MedicalDocumentWhereInput[]
    OR?: MedicalDocumentWhereInput[]
    NOT?: MedicalDocumentWhereInput | MedicalDocumentWhereInput[]
    patientId?: StringFilter<"MedicalDocument"> | string
    name?: StringFilter<"MedicalDocument"> | string
    fileUrl?: StringFilter<"MedicalDocument"> | string
    sizeBytes?: IntFilter<"MedicalDocument"> | number
    type?: StringFilter<"MedicalDocument"> | string
    uploadedAt?: DateTimeFilter<"MedicalDocument"> | Date | string
    patient?: XOR<PatientProfileScalarRelationFilter, PatientProfileWhereInput>
  }, "id">

  export type MedicalDocumentOrderByWithAggregationInput = {
    id?: SortOrder
    patientId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    sizeBytes?: SortOrder
    type?: SortOrder
    uploadedAt?: SortOrder
    _count?: MedicalDocumentCountOrderByAggregateInput
    _avg?: MedicalDocumentAvgOrderByAggregateInput
    _max?: MedicalDocumentMaxOrderByAggregateInput
    _min?: MedicalDocumentMinOrderByAggregateInput
    _sum?: MedicalDocumentSumOrderByAggregateInput
  }

  export type MedicalDocumentScalarWhereWithAggregatesInput = {
    AND?: MedicalDocumentScalarWhereWithAggregatesInput | MedicalDocumentScalarWhereWithAggregatesInput[]
    OR?: MedicalDocumentScalarWhereWithAggregatesInput[]
    NOT?: MedicalDocumentScalarWhereWithAggregatesInput | MedicalDocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MedicalDocument"> | string
    patientId?: StringWithAggregatesFilter<"MedicalDocument"> | string
    name?: StringWithAggregatesFilter<"MedicalDocument"> | string
    fileUrl?: StringWithAggregatesFilter<"MedicalDocument"> | string
    sizeBytes?: IntWithAggregatesFilter<"MedicalDocument"> | number
    type?: StringWithAggregatesFilter<"MedicalDocument"> | string
    uploadedAt?: DateTimeWithAggregatesFilter<"MedicalDocument"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    patientProfile?: PatientProfileCreateNestedOneWithoutUserInput
    employeeProfile?: EmployeeProfileCreateNestedOneWithoutUserInput
    doctorAppointments?: AppointmentCreateNestedManyWithoutDoctorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    patientProfile?: PatientProfileUncheckedCreateNestedOneWithoutUserInput
    employeeProfile?: EmployeeProfileUncheckedCreateNestedOneWithoutUserInput
    doctorAppointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientProfile?: PatientProfileUpdateOneWithoutUserNestedInput
    employeeProfile?: EmployeeProfileUpdateOneWithoutUserNestedInput
    doctorAppointments?: AppointmentUpdateManyWithoutDoctorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientProfile?: PatientProfileUncheckedUpdateOneWithoutUserNestedInput
    employeeProfile?: EmployeeProfileUncheckedUpdateOneWithoutUserNestedInput
    doctorAppointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name: string
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeProfileCreateInput = {
    id?: string
    position: string
    department: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEmployeeProfileInput
  }

  export type EmployeeProfileUncheckedCreateInput = {
    id?: string
    userId: string
    position: string
    department: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEmployeeProfileNestedInput
  }

  export type EmployeeProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeProfileCreateManyInput = {
    id?: string
    userId: string
    position: string
    department: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientProfileCreateInput = {
    id?: string
    address?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    insuranceProvider?: string | null
    insuranceNumber?: string | null
    bloodType?: $Enums.BloodType
    height?: string | null
    weight?: string | null
    bloodPressure?: string | null
    heartRate?: string | null
    bloodSugarLevel?: string | null
    allergies?: string | null
    medications?: string | null
    chronicDiseases?: string | null
    medicalHistory?: string | null
    lastDentalVisit?: Date | string | null
    gumCondition?: $Enums.GumCondition
    toothDecay?: string | null
    missingTeethCount?: string | null
    prostheticsUsed?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPatientProfileInput
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
    dentalHistory?: DentalHistoryCreateNestedManyWithoutPatientInput
    medicalDocuments?: MedicalDocumentCreateNestedManyWithoutPatientInput
  }

  export type PatientProfileUncheckedCreateInput = {
    id?: string
    userId: string
    address?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    insuranceProvider?: string | null
    insuranceNumber?: string | null
    bloodType?: $Enums.BloodType
    height?: string | null
    weight?: string | null
    bloodPressure?: string | null
    heartRate?: string | null
    bloodSugarLevel?: string | null
    allergies?: string | null
    medications?: string | null
    chronicDiseases?: string | null
    medicalHistory?: string | null
    lastDentalVisit?: Date | string | null
    gumCondition?: $Enums.GumCondition
    toothDecay?: string | null
    missingTeethCount?: string | null
    prostheticsUsed?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    dentalHistory?: DentalHistoryUncheckedCreateNestedManyWithoutPatientInput
    medicalDocuments?: MedicalDocumentUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceProvider?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bloodType?: EnumBloodTypeFieldUpdateOperationsInput | $Enums.BloodType
    height?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: NullableStringFieldUpdateOperationsInput | string | null
    heartRate?: NullableStringFieldUpdateOperationsInput | string | null
    bloodSugarLevel?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDiseases?: NullableStringFieldUpdateOperationsInput | string | null
    medicalHistory?: NullableStringFieldUpdateOperationsInput | string | null
    lastDentalVisit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gumCondition?: EnumGumConditionFieldUpdateOperationsInput | $Enums.GumCondition
    toothDecay?: NullableStringFieldUpdateOperationsInput | string | null
    missingTeethCount?: NullableStringFieldUpdateOperationsInput | string | null
    prostheticsUsed?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPatientProfileNestedInput
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
    dentalHistory?: DentalHistoryUpdateManyWithoutPatientNestedInput
    medicalDocuments?: MedicalDocumentUpdateManyWithoutPatientNestedInput
  }

  export type PatientProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceProvider?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bloodType?: EnumBloodTypeFieldUpdateOperationsInput | $Enums.BloodType
    height?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: NullableStringFieldUpdateOperationsInput | string | null
    heartRate?: NullableStringFieldUpdateOperationsInput | string | null
    bloodSugarLevel?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDiseases?: NullableStringFieldUpdateOperationsInput | string | null
    medicalHistory?: NullableStringFieldUpdateOperationsInput | string | null
    lastDentalVisit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gumCondition?: EnumGumConditionFieldUpdateOperationsInput | $Enums.GumCondition
    toothDecay?: NullableStringFieldUpdateOperationsInput | string | null
    missingTeethCount?: NullableStringFieldUpdateOperationsInput | string | null
    prostheticsUsed?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    dentalHistory?: DentalHistoryUncheckedUpdateManyWithoutPatientNestedInput
    medicalDocuments?: MedicalDocumentUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientProfileCreateManyInput = {
    id?: string
    userId: string
    address?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    insuranceProvider?: string | null
    insuranceNumber?: string | null
    bloodType?: $Enums.BloodType
    height?: string | null
    weight?: string | null
    bloodPressure?: string | null
    heartRate?: string | null
    bloodSugarLevel?: string | null
    allergies?: string | null
    medications?: string | null
    chronicDiseases?: string | null
    medicalHistory?: string | null
    lastDentalVisit?: Date | string | null
    gumCondition?: $Enums.GumCondition
    toothDecay?: string | null
    missingTeethCount?: string | null
    prostheticsUsed?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatientProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceProvider?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bloodType?: EnumBloodTypeFieldUpdateOperationsInput | $Enums.BloodType
    height?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: NullableStringFieldUpdateOperationsInput | string | null
    heartRate?: NullableStringFieldUpdateOperationsInput | string | null
    bloodSugarLevel?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDiseases?: NullableStringFieldUpdateOperationsInput | string | null
    medicalHistory?: NullableStringFieldUpdateOperationsInput | string | null
    lastDentalVisit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gumCondition?: EnumGumConditionFieldUpdateOperationsInput | $Enums.GumCondition
    toothDecay?: NullableStringFieldUpdateOperationsInput | string | null
    missingTeethCount?: NullableStringFieldUpdateOperationsInput | string | null
    prostheticsUsed?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceProvider?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bloodType?: EnumBloodTypeFieldUpdateOperationsInput | $Enums.BloodType
    height?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: NullableStringFieldUpdateOperationsInput | string | null
    heartRate?: NullableStringFieldUpdateOperationsInput | string | null
    bloodSugarLevel?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDiseases?: NullableStringFieldUpdateOperationsInput | string | null
    medicalHistory?: NullableStringFieldUpdateOperationsInput | string | null
    lastDentalVisit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gumCondition?: EnumGumConditionFieldUpdateOperationsInput | $Enums.GumCondition
    toothDecay?: NullableStringFieldUpdateOperationsInput | string | null
    missingTeethCount?: NullableStringFieldUpdateOperationsInput | string | null
    prostheticsUsed?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateInput = {
    id?: string
    guestFirstName?: string | null
    guestLastName?: string | null
    guestEmail?: string | null
    guestPhone?: string | null
    date: Date | string
    time: string
    reason: string
    notes?: string | null
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    patient?: PatientProfileCreateNestedOneWithoutAppointmentsInput
    doctor?: UserCreateNestedOneWithoutDoctorAppointmentsInput
    dentalHistory?: DentalHistoryCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentUncheckedCreateInput = {
    id?: string
    patientId?: string | null
    guestFirstName?: string | null
    guestLastName?: string | null
    guestEmail?: string | null
    guestPhone?: string | null
    doctorId?: string | null
    date: Date | string
    time: string
    reason: string
    notes?: string | null
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    dentalHistory?: DentalHistoryUncheckedCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    guestFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    guestLastName?: NullableStringFieldUpdateOperationsInput | string | null
    guestEmail?: NullableStringFieldUpdateOperationsInput | string | null
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientProfileUpdateOneWithoutAppointmentsNestedInput
    doctor?: UserUpdateOneWithoutDoctorAppointmentsNestedInput
    dentalHistory?: DentalHistoryUpdateOneWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: NullableStringFieldUpdateOperationsInput | string | null
    guestFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    guestLastName?: NullableStringFieldUpdateOperationsInput | string | null
    guestEmail?: NullableStringFieldUpdateOperationsInput | string | null
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    doctorId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dentalHistory?: DentalHistoryUncheckedUpdateOneWithoutAppointmentNestedInput
  }

  export type AppointmentCreateManyInput = {
    id?: string
    patientId?: string | null
    guestFirstName?: string | null
    guestLastName?: string | null
    guestEmail?: string | null
    guestPhone?: string | null
    doctorId?: string | null
    date: Date | string
    time: string
    reason: string
    notes?: string | null
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    guestFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    guestLastName?: NullableStringFieldUpdateOperationsInput | string | null
    guestEmail?: NullableStringFieldUpdateOperationsInput | string | null
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: NullableStringFieldUpdateOperationsInput | string | null
    guestFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    guestLastName?: NullableStringFieldUpdateOperationsInput | string | null
    guestEmail?: NullableStringFieldUpdateOperationsInput | string | null
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    doctorId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DentalHistoryCreateInput = {
    id?: string
    treatmentType: string
    treatmentStatus?: $Enums.TreatmentStatus
    paymentStatus?: $Enums.PaymentStatus
    date?: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientProfileCreateNestedOneWithoutDentalHistoryInput
    appointment?: AppointmentCreateNestedOneWithoutDentalHistoryInput
  }

  export type DentalHistoryUncheckedCreateInput = {
    id?: string
    patientId: string
    appointmentId?: string | null
    treatmentType: string
    treatmentStatus?: $Enums.TreatmentStatus
    paymentStatus?: $Enums.PaymentStatus
    date?: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DentalHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    treatmentType?: StringFieldUpdateOperationsInput | string
    treatmentStatus?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientProfileUpdateOneRequiredWithoutDentalHistoryNestedInput
    appointment?: AppointmentUpdateOneWithoutDentalHistoryNestedInput
  }

  export type DentalHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    appointmentId?: NullableStringFieldUpdateOperationsInput | string | null
    treatmentType?: StringFieldUpdateOperationsInput | string
    treatmentStatus?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DentalHistoryCreateManyInput = {
    id?: string
    patientId: string
    appointmentId?: string | null
    treatmentType: string
    treatmentStatus?: $Enums.TreatmentStatus
    paymentStatus?: $Enums.PaymentStatus
    date?: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DentalHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    treatmentType?: StringFieldUpdateOperationsInput | string
    treatmentStatus?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DentalHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    appointmentId?: NullableStringFieldUpdateOperationsInput | string | null
    treatmentType?: StringFieldUpdateOperationsInput | string
    treatmentStatus?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicalDocumentCreateInput = {
    id?: string
    name: string
    fileUrl: string
    sizeBytes: number
    type: string
    uploadedAt?: Date | string
    patient: PatientProfileCreateNestedOneWithoutMedicalDocumentsInput
  }

  export type MedicalDocumentUncheckedCreateInput = {
    id?: string
    patientId: string
    name: string
    fileUrl: string
    sizeBytes: number
    type: string
    uploadedAt?: Date | string
  }

  export type MedicalDocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientProfileUpdateOneRequiredWithoutMedicalDocumentsNestedInput
  }

  export type MedicalDocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicalDocumentCreateManyInput = {
    id?: string
    patientId: string
    name: string
    fileUrl: string
    sizeBytes: number
    type: string
    uploadedAt?: Date | string
  }

  export type MedicalDocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicalDocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PatientProfileNullableScalarRelationFilter = {
    is?: PatientProfileWhereInput | null
    isNot?: PatientProfileWhereInput | null
  }

  export type EmployeeProfileNullableScalarRelationFilter = {
    is?: EmployeeProfileWhereInput | null
    isNot?: EmployeeProfileWhereInput | null
  }

  export type AppointmentListRelationFilter = {
    every?: AppointmentWhereInput
    some?: AppointmentWhereInput
    none?: AppointmentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AppointmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type EmployeeProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    position?: SortOrder
    department?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    position?: SortOrder
    department?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    position?: SortOrder
    department?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableFilter<$PrismaModel> | $Enums.Gender | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumBloodTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BloodType | EnumBloodTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BloodType[] | ListEnumBloodTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BloodType[] | ListEnumBloodTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBloodTypeFilter<$PrismaModel> | $Enums.BloodType
  }

  export type EnumGumConditionFilter<$PrismaModel = never> = {
    equals?: $Enums.GumCondition | EnumGumConditionFieldRefInput<$PrismaModel>
    in?: $Enums.GumCondition[] | ListEnumGumConditionFieldRefInput<$PrismaModel>
    notIn?: $Enums.GumCondition[] | ListEnumGumConditionFieldRefInput<$PrismaModel>
    not?: NestedEnumGumConditionFilter<$PrismaModel> | $Enums.GumCondition
  }

  export type DentalHistoryListRelationFilter = {
    every?: DentalHistoryWhereInput
    some?: DentalHistoryWhereInput
    none?: DentalHistoryWhereInput
  }

  export type MedicalDocumentListRelationFilter = {
    every?: MedicalDocumentWhereInput
    some?: MedicalDocumentWhereInput
    none?: MedicalDocumentWhereInput
  }

  export type DentalHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MedicalDocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PatientProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    address?: SortOrder
    gender?: SortOrder
    dateOfBirth?: SortOrder
    emergencyContactName?: SortOrder
    emergencyContactPhone?: SortOrder
    insuranceProvider?: SortOrder
    insuranceNumber?: SortOrder
    bloodType?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    bloodPressure?: SortOrder
    heartRate?: SortOrder
    bloodSugarLevel?: SortOrder
    allergies?: SortOrder
    medications?: SortOrder
    chronicDiseases?: SortOrder
    medicalHistory?: SortOrder
    lastDentalVisit?: SortOrder
    gumCondition?: SortOrder
    toothDecay?: SortOrder
    missingTeethCount?: SortOrder
    prostheticsUsed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatientProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    address?: SortOrder
    gender?: SortOrder
    dateOfBirth?: SortOrder
    emergencyContactName?: SortOrder
    emergencyContactPhone?: SortOrder
    insuranceProvider?: SortOrder
    insuranceNumber?: SortOrder
    bloodType?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    bloodPressure?: SortOrder
    heartRate?: SortOrder
    bloodSugarLevel?: SortOrder
    allergies?: SortOrder
    medications?: SortOrder
    chronicDiseases?: SortOrder
    medicalHistory?: SortOrder
    lastDentalVisit?: SortOrder
    gumCondition?: SortOrder
    toothDecay?: SortOrder
    missingTeethCount?: SortOrder
    prostheticsUsed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatientProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    address?: SortOrder
    gender?: SortOrder
    dateOfBirth?: SortOrder
    emergencyContactName?: SortOrder
    emergencyContactPhone?: SortOrder
    insuranceProvider?: SortOrder
    insuranceNumber?: SortOrder
    bloodType?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    bloodPressure?: SortOrder
    heartRate?: SortOrder
    bloodSugarLevel?: SortOrder
    allergies?: SortOrder
    medications?: SortOrder
    chronicDiseases?: SortOrder
    medicalHistory?: SortOrder
    lastDentalVisit?: SortOrder
    gumCondition?: SortOrder
    toothDecay?: SortOrder
    missingTeethCount?: SortOrder
    prostheticsUsed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.Gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumBloodTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BloodType | EnumBloodTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BloodType[] | ListEnumBloodTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BloodType[] | ListEnumBloodTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBloodTypeWithAggregatesFilter<$PrismaModel> | $Enums.BloodType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBloodTypeFilter<$PrismaModel>
    _max?: NestedEnumBloodTypeFilter<$PrismaModel>
  }

  export type EnumGumConditionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GumCondition | EnumGumConditionFieldRefInput<$PrismaModel>
    in?: $Enums.GumCondition[] | ListEnumGumConditionFieldRefInput<$PrismaModel>
    notIn?: $Enums.GumCondition[] | ListEnumGumConditionFieldRefInput<$PrismaModel>
    not?: NestedEnumGumConditionWithAggregatesFilter<$PrismaModel> | $Enums.GumCondition
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGumConditionFilter<$PrismaModel>
    _max?: NestedEnumGumConditionFilter<$PrismaModel>
  }

  export type EnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type DentalHistoryNullableScalarRelationFilter = {
    is?: DentalHistoryWhereInput | null
    isNot?: DentalHistoryWhereInput | null
  }

  export type AppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    guestFirstName?: SortOrder
    guestLastName?: SortOrder
    guestEmail?: SortOrder
    guestPhone?: SortOrder
    doctorId?: SortOrder
    date?: SortOrder
    time?: SortOrder
    reason?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    guestFirstName?: SortOrder
    guestLastName?: SortOrder
    guestEmail?: SortOrder
    guestPhone?: SortOrder
    doctorId?: SortOrder
    date?: SortOrder
    time?: SortOrder
    reason?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    guestFirstName?: SortOrder
    guestLastName?: SortOrder
    guestEmail?: SortOrder
    guestPhone?: SortOrder
    doctorId?: SortOrder
    date?: SortOrder
    time?: SortOrder
    reason?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type EnumTreatmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TreatmentStatus | EnumTreatmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TreatmentStatus[] | ListEnumTreatmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TreatmentStatus[] | ListEnumTreatmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTreatmentStatusFilter<$PrismaModel> | $Enums.TreatmentStatus
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type PatientProfileScalarRelationFilter = {
    is?: PatientProfileWhereInput
    isNot?: PatientProfileWhereInput
  }

  export type AppointmentNullableScalarRelationFilter = {
    is?: AppointmentWhereInput | null
    isNot?: AppointmentWhereInput | null
  }

  export type DentalHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    appointmentId?: SortOrder
    treatmentType?: SortOrder
    treatmentStatus?: SortOrder
    paymentStatus?: SortOrder
    date?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DentalHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    appointmentId?: SortOrder
    treatmentType?: SortOrder
    treatmentStatus?: SortOrder
    paymentStatus?: SortOrder
    date?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DentalHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    appointmentId?: SortOrder
    treatmentType?: SortOrder
    treatmentStatus?: SortOrder
    paymentStatus?: SortOrder
    date?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTreatmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TreatmentStatus | EnumTreatmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TreatmentStatus[] | ListEnumTreatmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TreatmentStatus[] | ListEnumTreatmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTreatmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.TreatmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTreatmentStatusFilter<$PrismaModel>
    _max?: NestedEnumTreatmentStatusFilter<$PrismaModel>
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type MedicalDocumentCountOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    sizeBytes?: SortOrder
    type?: SortOrder
    uploadedAt?: SortOrder
  }

  export type MedicalDocumentAvgOrderByAggregateInput = {
    sizeBytes?: SortOrder
  }

  export type MedicalDocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    sizeBytes?: SortOrder
    type?: SortOrder
    uploadedAt?: SortOrder
  }

  export type MedicalDocumentMinOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    name?: SortOrder
    fileUrl?: SortOrder
    sizeBytes?: SortOrder
    type?: SortOrder
    uploadedAt?: SortOrder
  }

  export type MedicalDocumentSumOrderByAggregateInput = {
    sizeBytes?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type PatientProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<PatientProfileCreateWithoutUserInput, PatientProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: PatientProfileCreateOrConnectWithoutUserInput
    connect?: PatientProfileWhereUniqueInput
  }

  export type EmployeeProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<EmployeeProfileCreateWithoutUserInput, EmployeeProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: EmployeeProfileCreateOrConnectWithoutUserInput
    connect?: EmployeeProfileWhereUniqueInput
  }

  export type AppointmentCreateNestedManyWithoutDoctorInput = {
    create?: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput> | AppointmentCreateWithoutDoctorInput[] | AppointmentUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDoctorInput | AppointmentCreateOrConnectWithoutDoctorInput[]
    createMany?: AppointmentCreateManyDoctorInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type PatientProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<PatientProfileCreateWithoutUserInput, PatientProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: PatientProfileCreateOrConnectWithoutUserInput
    connect?: PatientProfileWhereUniqueInput
  }

  export type EmployeeProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<EmployeeProfileCreateWithoutUserInput, EmployeeProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: EmployeeProfileCreateOrConnectWithoutUserInput
    connect?: EmployeeProfileWhereUniqueInput
  }

  export type AppointmentUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput> | AppointmentCreateWithoutDoctorInput[] | AppointmentUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDoctorInput | AppointmentCreateOrConnectWithoutDoctorInput[]
    createMany?: AppointmentCreateManyDoctorInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PatientProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<PatientProfileCreateWithoutUserInput, PatientProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: PatientProfileCreateOrConnectWithoutUserInput
    upsert?: PatientProfileUpsertWithoutUserInput
    disconnect?: PatientProfileWhereInput | boolean
    delete?: PatientProfileWhereInput | boolean
    connect?: PatientProfileWhereUniqueInput
    update?: XOR<XOR<PatientProfileUpdateToOneWithWhereWithoutUserInput, PatientProfileUpdateWithoutUserInput>, PatientProfileUncheckedUpdateWithoutUserInput>
  }

  export type EmployeeProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<EmployeeProfileCreateWithoutUserInput, EmployeeProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: EmployeeProfileCreateOrConnectWithoutUserInput
    upsert?: EmployeeProfileUpsertWithoutUserInput
    disconnect?: EmployeeProfileWhereInput | boolean
    delete?: EmployeeProfileWhereInput | boolean
    connect?: EmployeeProfileWhereUniqueInput
    update?: XOR<XOR<EmployeeProfileUpdateToOneWithWhereWithoutUserInput, EmployeeProfileUpdateWithoutUserInput>, EmployeeProfileUncheckedUpdateWithoutUserInput>
  }

  export type AppointmentUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput> | AppointmentCreateWithoutDoctorInput[] | AppointmentUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDoctorInput | AppointmentCreateOrConnectWithoutDoctorInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutDoctorInput | AppointmentUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: AppointmentCreateManyDoctorInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutDoctorInput | AppointmentUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutDoctorInput | AppointmentUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type PatientProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<PatientProfileCreateWithoutUserInput, PatientProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: PatientProfileCreateOrConnectWithoutUserInput
    upsert?: PatientProfileUpsertWithoutUserInput
    disconnect?: PatientProfileWhereInput | boolean
    delete?: PatientProfileWhereInput | boolean
    connect?: PatientProfileWhereUniqueInput
    update?: XOR<XOR<PatientProfileUpdateToOneWithWhereWithoutUserInput, PatientProfileUpdateWithoutUserInput>, PatientProfileUncheckedUpdateWithoutUserInput>
  }

  export type EmployeeProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<EmployeeProfileCreateWithoutUserInput, EmployeeProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: EmployeeProfileCreateOrConnectWithoutUserInput
    upsert?: EmployeeProfileUpsertWithoutUserInput
    disconnect?: EmployeeProfileWhereInput | boolean
    delete?: EmployeeProfileWhereInput | boolean
    connect?: EmployeeProfileWhereUniqueInput
    update?: XOR<XOR<EmployeeProfileUpdateToOneWithWhereWithoutUserInput, EmployeeProfileUpdateWithoutUserInput>, EmployeeProfileUncheckedUpdateWithoutUserInput>
  }

  export type AppointmentUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput> | AppointmentCreateWithoutDoctorInput[] | AppointmentUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDoctorInput | AppointmentCreateOrConnectWithoutDoctorInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutDoctorInput | AppointmentUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: AppointmentCreateManyDoctorInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutDoctorInput | AppointmentUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutDoctorInput | AppointmentUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutEmployeeProfileInput = {
    create?: XOR<UserCreateWithoutEmployeeProfileInput, UserUncheckedCreateWithoutEmployeeProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmployeeProfileInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutEmployeeProfileNestedInput = {
    create?: XOR<UserCreateWithoutEmployeeProfileInput, UserUncheckedCreateWithoutEmployeeProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmployeeProfileInput
    upsert?: UserUpsertWithoutEmployeeProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEmployeeProfileInput, UserUpdateWithoutEmployeeProfileInput>, UserUncheckedUpdateWithoutEmployeeProfileInput>
  }

  export type UserCreateNestedOneWithoutPatientProfileInput = {
    create?: XOR<UserCreateWithoutPatientProfileInput, UserUncheckedCreateWithoutPatientProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatientProfileInput
    connect?: UserWhereUniqueInput
  }

  export type AppointmentCreateNestedManyWithoutPatientInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type DentalHistoryCreateNestedManyWithoutPatientInput = {
    create?: XOR<DentalHistoryCreateWithoutPatientInput, DentalHistoryUncheckedCreateWithoutPatientInput> | DentalHistoryCreateWithoutPatientInput[] | DentalHistoryUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: DentalHistoryCreateOrConnectWithoutPatientInput | DentalHistoryCreateOrConnectWithoutPatientInput[]
    createMany?: DentalHistoryCreateManyPatientInputEnvelope
    connect?: DentalHistoryWhereUniqueInput | DentalHistoryWhereUniqueInput[]
  }

  export type MedicalDocumentCreateNestedManyWithoutPatientInput = {
    create?: XOR<MedicalDocumentCreateWithoutPatientInput, MedicalDocumentUncheckedCreateWithoutPatientInput> | MedicalDocumentCreateWithoutPatientInput[] | MedicalDocumentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: MedicalDocumentCreateOrConnectWithoutPatientInput | MedicalDocumentCreateOrConnectWithoutPatientInput[]
    createMany?: MedicalDocumentCreateManyPatientInputEnvelope
    connect?: MedicalDocumentWhereUniqueInput | MedicalDocumentWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type DentalHistoryUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<DentalHistoryCreateWithoutPatientInput, DentalHistoryUncheckedCreateWithoutPatientInput> | DentalHistoryCreateWithoutPatientInput[] | DentalHistoryUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: DentalHistoryCreateOrConnectWithoutPatientInput | DentalHistoryCreateOrConnectWithoutPatientInput[]
    createMany?: DentalHistoryCreateManyPatientInputEnvelope
    connect?: DentalHistoryWhereUniqueInput | DentalHistoryWhereUniqueInput[]
  }

  export type MedicalDocumentUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<MedicalDocumentCreateWithoutPatientInput, MedicalDocumentUncheckedCreateWithoutPatientInput> | MedicalDocumentCreateWithoutPatientInput[] | MedicalDocumentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: MedicalDocumentCreateOrConnectWithoutPatientInput | MedicalDocumentCreateOrConnectWithoutPatientInput[]
    createMany?: MedicalDocumentCreateManyPatientInputEnvelope
    connect?: MedicalDocumentWhereUniqueInput | MedicalDocumentWhereUniqueInput[]
  }

  export type NullableEnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumBloodTypeFieldUpdateOperationsInput = {
    set?: $Enums.BloodType
  }

  export type EnumGumConditionFieldUpdateOperationsInput = {
    set?: $Enums.GumCondition
  }

  export type UserUpdateOneRequiredWithoutPatientProfileNestedInput = {
    create?: XOR<UserCreateWithoutPatientProfileInput, UserUncheckedCreateWithoutPatientProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatientProfileInput
    upsert?: UserUpsertWithoutPatientProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPatientProfileInput, UserUpdateWithoutPatientProfileInput>, UserUncheckedUpdateWithoutPatientProfileInput>
  }

  export type AppointmentUpdateManyWithoutPatientNestedInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutPatientInput | AppointmentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutPatientInput | AppointmentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutPatientInput | AppointmentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type DentalHistoryUpdateManyWithoutPatientNestedInput = {
    create?: XOR<DentalHistoryCreateWithoutPatientInput, DentalHistoryUncheckedCreateWithoutPatientInput> | DentalHistoryCreateWithoutPatientInput[] | DentalHistoryUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: DentalHistoryCreateOrConnectWithoutPatientInput | DentalHistoryCreateOrConnectWithoutPatientInput[]
    upsert?: DentalHistoryUpsertWithWhereUniqueWithoutPatientInput | DentalHistoryUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: DentalHistoryCreateManyPatientInputEnvelope
    set?: DentalHistoryWhereUniqueInput | DentalHistoryWhereUniqueInput[]
    disconnect?: DentalHistoryWhereUniqueInput | DentalHistoryWhereUniqueInput[]
    delete?: DentalHistoryWhereUniqueInput | DentalHistoryWhereUniqueInput[]
    connect?: DentalHistoryWhereUniqueInput | DentalHistoryWhereUniqueInput[]
    update?: DentalHistoryUpdateWithWhereUniqueWithoutPatientInput | DentalHistoryUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: DentalHistoryUpdateManyWithWhereWithoutPatientInput | DentalHistoryUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: DentalHistoryScalarWhereInput | DentalHistoryScalarWhereInput[]
  }

  export type MedicalDocumentUpdateManyWithoutPatientNestedInput = {
    create?: XOR<MedicalDocumentCreateWithoutPatientInput, MedicalDocumentUncheckedCreateWithoutPatientInput> | MedicalDocumentCreateWithoutPatientInput[] | MedicalDocumentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: MedicalDocumentCreateOrConnectWithoutPatientInput | MedicalDocumentCreateOrConnectWithoutPatientInput[]
    upsert?: MedicalDocumentUpsertWithWhereUniqueWithoutPatientInput | MedicalDocumentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: MedicalDocumentCreateManyPatientInputEnvelope
    set?: MedicalDocumentWhereUniqueInput | MedicalDocumentWhereUniqueInput[]
    disconnect?: MedicalDocumentWhereUniqueInput | MedicalDocumentWhereUniqueInput[]
    delete?: MedicalDocumentWhereUniqueInput | MedicalDocumentWhereUniqueInput[]
    connect?: MedicalDocumentWhereUniqueInput | MedicalDocumentWhereUniqueInput[]
    update?: MedicalDocumentUpdateWithWhereUniqueWithoutPatientInput | MedicalDocumentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: MedicalDocumentUpdateManyWithWhereWithoutPatientInput | MedicalDocumentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: MedicalDocumentScalarWhereInput | MedicalDocumentScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutPatientInput | AppointmentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutPatientInput | AppointmentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutPatientInput | AppointmentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type DentalHistoryUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<DentalHistoryCreateWithoutPatientInput, DentalHistoryUncheckedCreateWithoutPatientInput> | DentalHistoryCreateWithoutPatientInput[] | DentalHistoryUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: DentalHistoryCreateOrConnectWithoutPatientInput | DentalHistoryCreateOrConnectWithoutPatientInput[]
    upsert?: DentalHistoryUpsertWithWhereUniqueWithoutPatientInput | DentalHistoryUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: DentalHistoryCreateManyPatientInputEnvelope
    set?: DentalHistoryWhereUniqueInput | DentalHistoryWhereUniqueInput[]
    disconnect?: DentalHistoryWhereUniqueInput | DentalHistoryWhereUniqueInput[]
    delete?: DentalHistoryWhereUniqueInput | DentalHistoryWhereUniqueInput[]
    connect?: DentalHistoryWhereUniqueInput | DentalHistoryWhereUniqueInput[]
    update?: DentalHistoryUpdateWithWhereUniqueWithoutPatientInput | DentalHistoryUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: DentalHistoryUpdateManyWithWhereWithoutPatientInput | DentalHistoryUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: DentalHistoryScalarWhereInput | DentalHistoryScalarWhereInput[]
  }

  export type MedicalDocumentUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<MedicalDocumentCreateWithoutPatientInput, MedicalDocumentUncheckedCreateWithoutPatientInput> | MedicalDocumentCreateWithoutPatientInput[] | MedicalDocumentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: MedicalDocumentCreateOrConnectWithoutPatientInput | MedicalDocumentCreateOrConnectWithoutPatientInput[]
    upsert?: MedicalDocumentUpsertWithWhereUniqueWithoutPatientInput | MedicalDocumentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: MedicalDocumentCreateManyPatientInputEnvelope
    set?: MedicalDocumentWhereUniqueInput | MedicalDocumentWhereUniqueInput[]
    disconnect?: MedicalDocumentWhereUniqueInput | MedicalDocumentWhereUniqueInput[]
    delete?: MedicalDocumentWhereUniqueInput | MedicalDocumentWhereUniqueInput[]
    connect?: MedicalDocumentWhereUniqueInput | MedicalDocumentWhereUniqueInput[]
    update?: MedicalDocumentUpdateWithWhereUniqueWithoutPatientInput | MedicalDocumentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: MedicalDocumentUpdateManyWithWhereWithoutPatientInput | MedicalDocumentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: MedicalDocumentScalarWhereInput | MedicalDocumentScalarWhereInput[]
  }

  export type PatientProfileCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<PatientProfileCreateWithoutAppointmentsInput, PatientProfileUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: PatientProfileCreateOrConnectWithoutAppointmentsInput
    connect?: PatientProfileWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutDoctorAppointmentsInput = {
    create?: XOR<UserCreateWithoutDoctorAppointmentsInput, UserUncheckedCreateWithoutDoctorAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDoctorAppointmentsInput
    connect?: UserWhereUniqueInput
  }

  export type DentalHistoryCreateNestedOneWithoutAppointmentInput = {
    create?: XOR<DentalHistoryCreateWithoutAppointmentInput, DentalHistoryUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: DentalHistoryCreateOrConnectWithoutAppointmentInput
    connect?: DentalHistoryWhereUniqueInput
  }

  export type DentalHistoryUncheckedCreateNestedOneWithoutAppointmentInput = {
    create?: XOR<DentalHistoryCreateWithoutAppointmentInput, DentalHistoryUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: DentalHistoryCreateOrConnectWithoutAppointmentInput
    connect?: DentalHistoryWhereUniqueInput
  }

  export type EnumAppointmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.AppointmentStatus
  }

  export type PatientProfileUpdateOneWithoutAppointmentsNestedInput = {
    create?: XOR<PatientProfileCreateWithoutAppointmentsInput, PatientProfileUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: PatientProfileCreateOrConnectWithoutAppointmentsInput
    upsert?: PatientProfileUpsertWithoutAppointmentsInput
    disconnect?: PatientProfileWhereInput | boolean
    delete?: PatientProfileWhereInput | boolean
    connect?: PatientProfileWhereUniqueInput
    update?: XOR<XOR<PatientProfileUpdateToOneWithWhereWithoutAppointmentsInput, PatientProfileUpdateWithoutAppointmentsInput>, PatientProfileUncheckedUpdateWithoutAppointmentsInput>
  }

  export type UserUpdateOneWithoutDoctorAppointmentsNestedInput = {
    create?: XOR<UserCreateWithoutDoctorAppointmentsInput, UserUncheckedCreateWithoutDoctorAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDoctorAppointmentsInput
    upsert?: UserUpsertWithoutDoctorAppointmentsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDoctorAppointmentsInput, UserUpdateWithoutDoctorAppointmentsInput>, UserUncheckedUpdateWithoutDoctorAppointmentsInput>
  }

  export type DentalHistoryUpdateOneWithoutAppointmentNestedInput = {
    create?: XOR<DentalHistoryCreateWithoutAppointmentInput, DentalHistoryUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: DentalHistoryCreateOrConnectWithoutAppointmentInput
    upsert?: DentalHistoryUpsertWithoutAppointmentInput
    disconnect?: DentalHistoryWhereInput | boolean
    delete?: DentalHistoryWhereInput | boolean
    connect?: DentalHistoryWhereUniqueInput
    update?: XOR<XOR<DentalHistoryUpdateToOneWithWhereWithoutAppointmentInput, DentalHistoryUpdateWithoutAppointmentInput>, DentalHistoryUncheckedUpdateWithoutAppointmentInput>
  }

  export type DentalHistoryUncheckedUpdateOneWithoutAppointmentNestedInput = {
    create?: XOR<DentalHistoryCreateWithoutAppointmentInput, DentalHistoryUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: DentalHistoryCreateOrConnectWithoutAppointmentInput
    upsert?: DentalHistoryUpsertWithoutAppointmentInput
    disconnect?: DentalHistoryWhereInput | boolean
    delete?: DentalHistoryWhereInput | boolean
    connect?: DentalHistoryWhereUniqueInput
    update?: XOR<XOR<DentalHistoryUpdateToOneWithWhereWithoutAppointmentInput, DentalHistoryUpdateWithoutAppointmentInput>, DentalHistoryUncheckedUpdateWithoutAppointmentInput>
  }

  export type PatientProfileCreateNestedOneWithoutDentalHistoryInput = {
    create?: XOR<PatientProfileCreateWithoutDentalHistoryInput, PatientProfileUncheckedCreateWithoutDentalHistoryInput>
    connectOrCreate?: PatientProfileCreateOrConnectWithoutDentalHistoryInput
    connect?: PatientProfileWhereUniqueInput
  }

  export type AppointmentCreateNestedOneWithoutDentalHistoryInput = {
    create?: XOR<AppointmentCreateWithoutDentalHistoryInput, AppointmentUncheckedCreateWithoutDentalHistoryInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutDentalHistoryInput
    connect?: AppointmentWhereUniqueInput
  }

  export type EnumTreatmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.TreatmentStatus
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type PatientProfileUpdateOneRequiredWithoutDentalHistoryNestedInput = {
    create?: XOR<PatientProfileCreateWithoutDentalHistoryInput, PatientProfileUncheckedCreateWithoutDentalHistoryInput>
    connectOrCreate?: PatientProfileCreateOrConnectWithoutDentalHistoryInput
    upsert?: PatientProfileUpsertWithoutDentalHistoryInput
    connect?: PatientProfileWhereUniqueInput
    update?: XOR<XOR<PatientProfileUpdateToOneWithWhereWithoutDentalHistoryInput, PatientProfileUpdateWithoutDentalHistoryInput>, PatientProfileUncheckedUpdateWithoutDentalHistoryInput>
  }

  export type AppointmentUpdateOneWithoutDentalHistoryNestedInput = {
    create?: XOR<AppointmentCreateWithoutDentalHistoryInput, AppointmentUncheckedCreateWithoutDentalHistoryInput>
    connectOrCreate?: AppointmentCreateOrConnectWithoutDentalHistoryInput
    upsert?: AppointmentUpsertWithoutDentalHistoryInput
    disconnect?: AppointmentWhereInput | boolean
    delete?: AppointmentWhereInput | boolean
    connect?: AppointmentWhereUniqueInput
    update?: XOR<XOR<AppointmentUpdateToOneWithWhereWithoutDentalHistoryInput, AppointmentUpdateWithoutDentalHistoryInput>, AppointmentUncheckedUpdateWithoutDentalHistoryInput>
  }

  export type PatientProfileCreateNestedOneWithoutMedicalDocumentsInput = {
    create?: XOR<PatientProfileCreateWithoutMedicalDocumentsInput, PatientProfileUncheckedCreateWithoutMedicalDocumentsInput>
    connectOrCreate?: PatientProfileCreateOrConnectWithoutMedicalDocumentsInput
    connect?: PatientProfileWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PatientProfileUpdateOneRequiredWithoutMedicalDocumentsNestedInput = {
    create?: XOR<PatientProfileCreateWithoutMedicalDocumentsInput, PatientProfileUncheckedCreateWithoutMedicalDocumentsInput>
    connectOrCreate?: PatientProfileCreateOrConnectWithoutMedicalDocumentsInput
    upsert?: PatientProfileUpsertWithoutMedicalDocumentsInput
    connect?: PatientProfileWhereUniqueInput
    update?: XOR<XOR<PatientProfileUpdateToOneWithWhereWithoutMedicalDocumentsInput, PatientProfileUpdateWithoutMedicalDocumentsInput>, PatientProfileUncheckedUpdateWithoutMedicalDocumentsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableFilter<$PrismaModel> | $Enums.Gender | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumBloodTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BloodType | EnumBloodTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BloodType[] | ListEnumBloodTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BloodType[] | ListEnumBloodTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBloodTypeFilter<$PrismaModel> | $Enums.BloodType
  }

  export type NestedEnumGumConditionFilter<$PrismaModel = never> = {
    equals?: $Enums.GumCondition | EnumGumConditionFieldRefInput<$PrismaModel>
    in?: $Enums.GumCondition[] | ListEnumGumConditionFieldRefInput<$PrismaModel>
    notIn?: $Enums.GumCondition[] | ListEnumGumConditionFieldRefInput<$PrismaModel>
    not?: NestedEnumGumConditionFilter<$PrismaModel> | $Enums.GumCondition
  }

  export type NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.Gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumBloodTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BloodType | EnumBloodTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BloodType[] | ListEnumBloodTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BloodType[] | ListEnumBloodTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBloodTypeWithAggregatesFilter<$PrismaModel> | $Enums.BloodType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBloodTypeFilter<$PrismaModel>
    _max?: NestedEnumBloodTypeFilter<$PrismaModel>
  }

  export type NestedEnumGumConditionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GumCondition | EnumGumConditionFieldRefInput<$PrismaModel>
    in?: $Enums.GumCondition[] | ListEnumGumConditionFieldRefInput<$PrismaModel>
    notIn?: $Enums.GumCondition[] | ListEnumGumConditionFieldRefInput<$PrismaModel>
    not?: NestedEnumGumConditionWithAggregatesFilter<$PrismaModel> | $Enums.GumCondition
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGumConditionFilter<$PrismaModel>
    _max?: NestedEnumGumConditionFilter<$PrismaModel>
  }

  export type NestedEnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppointmentStatus[] | ListEnumAppointmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type NestedEnumTreatmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TreatmentStatus | EnumTreatmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TreatmentStatus[] | ListEnumTreatmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TreatmentStatus[] | ListEnumTreatmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTreatmentStatusFilter<$PrismaModel> | $Enums.TreatmentStatus
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumTreatmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TreatmentStatus | EnumTreatmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TreatmentStatus[] | ListEnumTreatmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TreatmentStatus[] | ListEnumTreatmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTreatmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.TreatmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTreatmentStatusFilter<$PrismaModel>
    _max?: NestedEnumTreatmentStatusFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type PatientProfileCreateWithoutUserInput = {
    id?: string
    address?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    insuranceProvider?: string | null
    insuranceNumber?: string | null
    bloodType?: $Enums.BloodType
    height?: string | null
    weight?: string | null
    bloodPressure?: string | null
    heartRate?: string | null
    bloodSugarLevel?: string | null
    allergies?: string | null
    medications?: string | null
    chronicDiseases?: string | null
    medicalHistory?: string | null
    lastDentalVisit?: Date | string | null
    gumCondition?: $Enums.GumCondition
    toothDecay?: string | null
    missingTeethCount?: string | null
    prostheticsUsed?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
    dentalHistory?: DentalHistoryCreateNestedManyWithoutPatientInput
    medicalDocuments?: MedicalDocumentCreateNestedManyWithoutPatientInput
  }

  export type PatientProfileUncheckedCreateWithoutUserInput = {
    id?: string
    address?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    insuranceProvider?: string | null
    insuranceNumber?: string | null
    bloodType?: $Enums.BloodType
    height?: string | null
    weight?: string | null
    bloodPressure?: string | null
    heartRate?: string | null
    bloodSugarLevel?: string | null
    allergies?: string | null
    medications?: string | null
    chronicDiseases?: string | null
    medicalHistory?: string | null
    lastDentalVisit?: Date | string | null
    gumCondition?: $Enums.GumCondition
    toothDecay?: string | null
    missingTeethCount?: string | null
    prostheticsUsed?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    dentalHistory?: DentalHistoryUncheckedCreateNestedManyWithoutPatientInput
    medicalDocuments?: MedicalDocumentUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientProfileCreateOrConnectWithoutUserInput = {
    where: PatientProfileWhereUniqueInput
    create: XOR<PatientProfileCreateWithoutUserInput, PatientProfileUncheckedCreateWithoutUserInput>
  }

  export type EmployeeProfileCreateWithoutUserInput = {
    id?: string
    position: string
    department: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeProfileUncheckedCreateWithoutUserInput = {
    id?: string
    position: string
    department: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeProfileCreateOrConnectWithoutUserInput = {
    where: EmployeeProfileWhereUniqueInput
    create: XOR<EmployeeProfileCreateWithoutUserInput, EmployeeProfileUncheckedCreateWithoutUserInput>
  }

  export type AppointmentCreateWithoutDoctorInput = {
    id?: string
    guestFirstName?: string | null
    guestLastName?: string | null
    guestEmail?: string | null
    guestPhone?: string | null
    date: Date | string
    time: string
    reason: string
    notes?: string | null
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    patient?: PatientProfileCreateNestedOneWithoutAppointmentsInput
    dentalHistory?: DentalHistoryCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentUncheckedCreateWithoutDoctorInput = {
    id?: string
    patientId?: string | null
    guestFirstName?: string | null
    guestLastName?: string | null
    guestEmail?: string | null
    guestPhone?: string | null
    date: Date | string
    time: string
    reason: string
    notes?: string | null
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    dentalHistory?: DentalHistoryUncheckedCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentCreateOrConnectWithoutDoctorInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput>
  }

  export type AppointmentCreateManyDoctorInputEnvelope = {
    data: AppointmentCreateManyDoctorInput | AppointmentCreateManyDoctorInput[]
    skipDuplicates?: boolean
  }

  export type PatientProfileUpsertWithoutUserInput = {
    update: XOR<PatientProfileUpdateWithoutUserInput, PatientProfileUncheckedUpdateWithoutUserInput>
    create: XOR<PatientProfileCreateWithoutUserInput, PatientProfileUncheckedCreateWithoutUserInput>
    where?: PatientProfileWhereInput
  }

  export type PatientProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: PatientProfileWhereInput
    data: XOR<PatientProfileUpdateWithoutUserInput, PatientProfileUncheckedUpdateWithoutUserInput>
  }

  export type PatientProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceProvider?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bloodType?: EnumBloodTypeFieldUpdateOperationsInput | $Enums.BloodType
    height?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: NullableStringFieldUpdateOperationsInput | string | null
    heartRate?: NullableStringFieldUpdateOperationsInput | string | null
    bloodSugarLevel?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDiseases?: NullableStringFieldUpdateOperationsInput | string | null
    medicalHistory?: NullableStringFieldUpdateOperationsInput | string | null
    lastDentalVisit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gumCondition?: EnumGumConditionFieldUpdateOperationsInput | $Enums.GumCondition
    toothDecay?: NullableStringFieldUpdateOperationsInput | string | null
    missingTeethCount?: NullableStringFieldUpdateOperationsInput | string | null
    prostheticsUsed?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
    dentalHistory?: DentalHistoryUpdateManyWithoutPatientNestedInput
    medicalDocuments?: MedicalDocumentUpdateManyWithoutPatientNestedInput
  }

  export type PatientProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceProvider?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bloodType?: EnumBloodTypeFieldUpdateOperationsInput | $Enums.BloodType
    height?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: NullableStringFieldUpdateOperationsInput | string | null
    heartRate?: NullableStringFieldUpdateOperationsInput | string | null
    bloodSugarLevel?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDiseases?: NullableStringFieldUpdateOperationsInput | string | null
    medicalHistory?: NullableStringFieldUpdateOperationsInput | string | null
    lastDentalVisit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gumCondition?: EnumGumConditionFieldUpdateOperationsInput | $Enums.GumCondition
    toothDecay?: NullableStringFieldUpdateOperationsInput | string | null
    missingTeethCount?: NullableStringFieldUpdateOperationsInput | string | null
    prostheticsUsed?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    dentalHistory?: DentalHistoryUncheckedUpdateManyWithoutPatientNestedInput
    medicalDocuments?: MedicalDocumentUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type EmployeeProfileUpsertWithoutUserInput = {
    update: XOR<EmployeeProfileUpdateWithoutUserInput, EmployeeProfileUncheckedUpdateWithoutUserInput>
    create: XOR<EmployeeProfileCreateWithoutUserInput, EmployeeProfileUncheckedCreateWithoutUserInput>
    where?: EmployeeProfileWhereInput
  }

  export type EmployeeProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: EmployeeProfileWhereInput
    data: XOR<EmployeeProfileUpdateWithoutUserInput, EmployeeProfileUncheckedUpdateWithoutUserInput>
  }

  export type EmployeeProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpsertWithWhereUniqueWithoutDoctorInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutDoctorInput, AppointmentUncheckedUpdateWithoutDoctorInput>
    create: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutDoctorInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutDoctorInput, AppointmentUncheckedUpdateWithoutDoctorInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutDoctorInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutDoctorInput>
  }

  export type AppointmentScalarWhereInput = {
    AND?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    OR?: AppointmentScalarWhereInput[]
    NOT?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    id?: StringFilter<"Appointment"> | string
    patientId?: StringNullableFilter<"Appointment"> | string | null
    guestFirstName?: StringNullableFilter<"Appointment"> | string | null
    guestLastName?: StringNullableFilter<"Appointment"> | string | null
    guestEmail?: StringNullableFilter<"Appointment"> | string | null
    guestPhone?: StringNullableFilter<"Appointment"> | string | null
    doctorId?: StringNullableFilter<"Appointment"> | string | null
    date?: DateTimeFilter<"Appointment"> | Date | string
    time?: StringFilter<"Appointment"> | string
    reason?: StringFilter<"Appointment"> | string
    notes?: StringNullableFilter<"Appointment"> | string | null
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
  }

  export type UserCreateWithoutEmployeeProfileInput = {
    id?: string
    email: string
    password: string
    name: string
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    patientProfile?: PatientProfileCreateNestedOneWithoutUserInput
    doctorAppointments?: AppointmentCreateNestedManyWithoutDoctorInput
  }

  export type UserUncheckedCreateWithoutEmployeeProfileInput = {
    id?: string
    email: string
    password: string
    name: string
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    patientProfile?: PatientProfileUncheckedCreateNestedOneWithoutUserInput
    doctorAppointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type UserCreateOrConnectWithoutEmployeeProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEmployeeProfileInput, UserUncheckedCreateWithoutEmployeeProfileInput>
  }

  export type UserUpsertWithoutEmployeeProfileInput = {
    update: XOR<UserUpdateWithoutEmployeeProfileInput, UserUncheckedUpdateWithoutEmployeeProfileInput>
    create: XOR<UserCreateWithoutEmployeeProfileInput, UserUncheckedCreateWithoutEmployeeProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEmployeeProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEmployeeProfileInput, UserUncheckedUpdateWithoutEmployeeProfileInput>
  }

  export type UserUpdateWithoutEmployeeProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientProfile?: PatientProfileUpdateOneWithoutUserNestedInput
    doctorAppointments?: AppointmentUpdateManyWithoutDoctorNestedInput
  }

  export type UserUncheckedUpdateWithoutEmployeeProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientProfile?: PatientProfileUncheckedUpdateOneWithoutUserNestedInput
    doctorAppointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type UserCreateWithoutPatientProfileInput = {
    id?: string
    email: string
    password: string
    name: string
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeProfile?: EmployeeProfileCreateNestedOneWithoutUserInput
    doctorAppointments?: AppointmentCreateNestedManyWithoutDoctorInput
  }

  export type UserUncheckedCreateWithoutPatientProfileInput = {
    id?: string
    email: string
    password: string
    name: string
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeProfile?: EmployeeProfileUncheckedCreateNestedOneWithoutUserInput
    doctorAppointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type UserCreateOrConnectWithoutPatientProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPatientProfileInput, UserUncheckedCreateWithoutPatientProfileInput>
  }

  export type AppointmentCreateWithoutPatientInput = {
    id?: string
    guestFirstName?: string | null
    guestLastName?: string | null
    guestEmail?: string | null
    guestPhone?: string | null
    date: Date | string
    time: string
    reason: string
    notes?: string | null
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    doctor?: UserCreateNestedOneWithoutDoctorAppointmentsInput
    dentalHistory?: DentalHistoryCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentUncheckedCreateWithoutPatientInput = {
    id?: string
    guestFirstName?: string | null
    guestLastName?: string | null
    guestEmail?: string | null
    guestPhone?: string | null
    doctorId?: string | null
    date: Date | string
    time: string
    reason: string
    notes?: string | null
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    dentalHistory?: DentalHistoryUncheckedCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentCreateOrConnectWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput>
  }

  export type AppointmentCreateManyPatientInputEnvelope = {
    data: AppointmentCreateManyPatientInput | AppointmentCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type DentalHistoryCreateWithoutPatientInput = {
    id?: string
    treatmentType: string
    treatmentStatus?: $Enums.TreatmentStatus
    paymentStatus?: $Enums.PaymentStatus
    date?: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointment?: AppointmentCreateNestedOneWithoutDentalHistoryInput
  }

  export type DentalHistoryUncheckedCreateWithoutPatientInput = {
    id?: string
    appointmentId?: string | null
    treatmentType: string
    treatmentStatus?: $Enums.TreatmentStatus
    paymentStatus?: $Enums.PaymentStatus
    date?: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DentalHistoryCreateOrConnectWithoutPatientInput = {
    where: DentalHistoryWhereUniqueInput
    create: XOR<DentalHistoryCreateWithoutPatientInput, DentalHistoryUncheckedCreateWithoutPatientInput>
  }

  export type DentalHistoryCreateManyPatientInputEnvelope = {
    data: DentalHistoryCreateManyPatientInput | DentalHistoryCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type MedicalDocumentCreateWithoutPatientInput = {
    id?: string
    name: string
    fileUrl: string
    sizeBytes: number
    type: string
    uploadedAt?: Date | string
  }

  export type MedicalDocumentUncheckedCreateWithoutPatientInput = {
    id?: string
    name: string
    fileUrl: string
    sizeBytes: number
    type: string
    uploadedAt?: Date | string
  }

  export type MedicalDocumentCreateOrConnectWithoutPatientInput = {
    where: MedicalDocumentWhereUniqueInput
    create: XOR<MedicalDocumentCreateWithoutPatientInput, MedicalDocumentUncheckedCreateWithoutPatientInput>
  }

  export type MedicalDocumentCreateManyPatientInputEnvelope = {
    data: MedicalDocumentCreateManyPatientInput | MedicalDocumentCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPatientProfileInput = {
    update: XOR<UserUpdateWithoutPatientProfileInput, UserUncheckedUpdateWithoutPatientProfileInput>
    create: XOR<UserCreateWithoutPatientProfileInput, UserUncheckedCreateWithoutPatientProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPatientProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPatientProfileInput, UserUncheckedUpdateWithoutPatientProfileInput>
  }

  export type UserUpdateWithoutPatientProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeProfile?: EmployeeProfileUpdateOneWithoutUserNestedInput
    doctorAppointments?: AppointmentUpdateManyWithoutDoctorNestedInput
  }

  export type UserUncheckedUpdateWithoutPatientProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeProfile?: EmployeeProfileUncheckedUpdateOneWithoutUserNestedInput
    doctorAppointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type AppointmentUpsertWithWhereUniqueWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutPatientInput, AppointmentUncheckedUpdateWithoutPatientInput>
    create: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutPatientInput, AppointmentUncheckedUpdateWithoutPatientInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutPatientInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutPatientInput>
  }

  export type DentalHistoryUpsertWithWhereUniqueWithoutPatientInput = {
    where: DentalHistoryWhereUniqueInput
    update: XOR<DentalHistoryUpdateWithoutPatientInput, DentalHistoryUncheckedUpdateWithoutPatientInput>
    create: XOR<DentalHistoryCreateWithoutPatientInput, DentalHistoryUncheckedCreateWithoutPatientInput>
  }

  export type DentalHistoryUpdateWithWhereUniqueWithoutPatientInput = {
    where: DentalHistoryWhereUniqueInput
    data: XOR<DentalHistoryUpdateWithoutPatientInput, DentalHistoryUncheckedUpdateWithoutPatientInput>
  }

  export type DentalHistoryUpdateManyWithWhereWithoutPatientInput = {
    where: DentalHistoryScalarWhereInput
    data: XOR<DentalHistoryUpdateManyMutationInput, DentalHistoryUncheckedUpdateManyWithoutPatientInput>
  }

  export type DentalHistoryScalarWhereInput = {
    AND?: DentalHistoryScalarWhereInput | DentalHistoryScalarWhereInput[]
    OR?: DentalHistoryScalarWhereInput[]
    NOT?: DentalHistoryScalarWhereInput | DentalHistoryScalarWhereInput[]
    id?: StringFilter<"DentalHistory"> | string
    patientId?: StringFilter<"DentalHistory"> | string
    appointmentId?: StringNullableFilter<"DentalHistory"> | string | null
    treatmentType?: StringFilter<"DentalHistory"> | string
    treatmentStatus?: EnumTreatmentStatusFilter<"DentalHistory"> | $Enums.TreatmentStatus
    paymentStatus?: EnumPaymentStatusFilter<"DentalHistory"> | $Enums.PaymentStatus
    date?: DateTimeFilter<"DentalHistory"> | Date | string
    notes?: StringNullableFilter<"DentalHistory"> | string | null
    createdAt?: DateTimeFilter<"DentalHistory"> | Date | string
    updatedAt?: DateTimeFilter<"DentalHistory"> | Date | string
  }

  export type MedicalDocumentUpsertWithWhereUniqueWithoutPatientInput = {
    where: MedicalDocumentWhereUniqueInput
    update: XOR<MedicalDocumentUpdateWithoutPatientInput, MedicalDocumentUncheckedUpdateWithoutPatientInput>
    create: XOR<MedicalDocumentCreateWithoutPatientInput, MedicalDocumentUncheckedCreateWithoutPatientInput>
  }

  export type MedicalDocumentUpdateWithWhereUniqueWithoutPatientInput = {
    where: MedicalDocumentWhereUniqueInput
    data: XOR<MedicalDocumentUpdateWithoutPatientInput, MedicalDocumentUncheckedUpdateWithoutPatientInput>
  }

  export type MedicalDocumentUpdateManyWithWhereWithoutPatientInput = {
    where: MedicalDocumentScalarWhereInput
    data: XOR<MedicalDocumentUpdateManyMutationInput, MedicalDocumentUncheckedUpdateManyWithoutPatientInput>
  }

  export type MedicalDocumentScalarWhereInput = {
    AND?: MedicalDocumentScalarWhereInput | MedicalDocumentScalarWhereInput[]
    OR?: MedicalDocumentScalarWhereInput[]
    NOT?: MedicalDocumentScalarWhereInput | MedicalDocumentScalarWhereInput[]
    id?: StringFilter<"MedicalDocument"> | string
    patientId?: StringFilter<"MedicalDocument"> | string
    name?: StringFilter<"MedicalDocument"> | string
    fileUrl?: StringFilter<"MedicalDocument"> | string
    sizeBytes?: IntFilter<"MedicalDocument"> | number
    type?: StringFilter<"MedicalDocument"> | string
    uploadedAt?: DateTimeFilter<"MedicalDocument"> | Date | string
  }

  export type PatientProfileCreateWithoutAppointmentsInput = {
    id?: string
    address?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    insuranceProvider?: string | null
    insuranceNumber?: string | null
    bloodType?: $Enums.BloodType
    height?: string | null
    weight?: string | null
    bloodPressure?: string | null
    heartRate?: string | null
    bloodSugarLevel?: string | null
    allergies?: string | null
    medications?: string | null
    chronicDiseases?: string | null
    medicalHistory?: string | null
    lastDentalVisit?: Date | string | null
    gumCondition?: $Enums.GumCondition
    toothDecay?: string | null
    missingTeethCount?: string | null
    prostheticsUsed?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPatientProfileInput
    dentalHistory?: DentalHistoryCreateNestedManyWithoutPatientInput
    medicalDocuments?: MedicalDocumentCreateNestedManyWithoutPatientInput
  }

  export type PatientProfileUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    userId: string
    address?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    insuranceProvider?: string | null
    insuranceNumber?: string | null
    bloodType?: $Enums.BloodType
    height?: string | null
    weight?: string | null
    bloodPressure?: string | null
    heartRate?: string | null
    bloodSugarLevel?: string | null
    allergies?: string | null
    medications?: string | null
    chronicDiseases?: string | null
    medicalHistory?: string | null
    lastDentalVisit?: Date | string | null
    gumCondition?: $Enums.GumCondition
    toothDecay?: string | null
    missingTeethCount?: string | null
    prostheticsUsed?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dentalHistory?: DentalHistoryUncheckedCreateNestedManyWithoutPatientInput
    medicalDocuments?: MedicalDocumentUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientProfileCreateOrConnectWithoutAppointmentsInput = {
    where: PatientProfileWhereUniqueInput
    create: XOR<PatientProfileCreateWithoutAppointmentsInput, PatientProfileUncheckedCreateWithoutAppointmentsInput>
  }

  export type UserCreateWithoutDoctorAppointmentsInput = {
    id?: string
    email: string
    password: string
    name: string
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    patientProfile?: PatientProfileCreateNestedOneWithoutUserInput
    employeeProfile?: EmployeeProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDoctorAppointmentsInput = {
    id?: string
    email: string
    password: string
    name: string
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    patientProfile?: PatientProfileUncheckedCreateNestedOneWithoutUserInput
    employeeProfile?: EmployeeProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDoctorAppointmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDoctorAppointmentsInput, UserUncheckedCreateWithoutDoctorAppointmentsInput>
  }

  export type DentalHistoryCreateWithoutAppointmentInput = {
    id?: string
    treatmentType: string
    treatmentStatus?: $Enums.TreatmentStatus
    paymentStatus?: $Enums.PaymentStatus
    date?: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientProfileCreateNestedOneWithoutDentalHistoryInput
  }

  export type DentalHistoryUncheckedCreateWithoutAppointmentInput = {
    id?: string
    patientId: string
    treatmentType: string
    treatmentStatus?: $Enums.TreatmentStatus
    paymentStatus?: $Enums.PaymentStatus
    date?: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DentalHistoryCreateOrConnectWithoutAppointmentInput = {
    where: DentalHistoryWhereUniqueInput
    create: XOR<DentalHistoryCreateWithoutAppointmentInput, DentalHistoryUncheckedCreateWithoutAppointmentInput>
  }

  export type PatientProfileUpsertWithoutAppointmentsInput = {
    update: XOR<PatientProfileUpdateWithoutAppointmentsInput, PatientProfileUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<PatientProfileCreateWithoutAppointmentsInput, PatientProfileUncheckedCreateWithoutAppointmentsInput>
    where?: PatientProfileWhereInput
  }

  export type PatientProfileUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: PatientProfileWhereInput
    data: XOR<PatientProfileUpdateWithoutAppointmentsInput, PatientProfileUncheckedUpdateWithoutAppointmentsInput>
  }

  export type PatientProfileUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceProvider?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bloodType?: EnumBloodTypeFieldUpdateOperationsInput | $Enums.BloodType
    height?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: NullableStringFieldUpdateOperationsInput | string | null
    heartRate?: NullableStringFieldUpdateOperationsInput | string | null
    bloodSugarLevel?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDiseases?: NullableStringFieldUpdateOperationsInput | string | null
    medicalHistory?: NullableStringFieldUpdateOperationsInput | string | null
    lastDentalVisit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gumCondition?: EnumGumConditionFieldUpdateOperationsInput | $Enums.GumCondition
    toothDecay?: NullableStringFieldUpdateOperationsInput | string | null
    missingTeethCount?: NullableStringFieldUpdateOperationsInput | string | null
    prostheticsUsed?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPatientProfileNestedInput
    dentalHistory?: DentalHistoryUpdateManyWithoutPatientNestedInput
    medicalDocuments?: MedicalDocumentUpdateManyWithoutPatientNestedInput
  }

  export type PatientProfileUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceProvider?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bloodType?: EnumBloodTypeFieldUpdateOperationsInput | $Enums.BloodType
    height?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: NullableStringFieldUpdateOperationsInput | string | null
    heartRate?: NullableStringFieldUpdateOperationsInput | string | null
    bloodSugarLevel?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDiseases?: NullableStringFieldUpdateOperationsInput | string | null
    medicalHistory?: NullableStringFieldUpdateOperationsInput | string | null
    lastDentalVisit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gumCondition?: EnumGumConditionFieldUpdateOperationsInput | $Enums.GumCondition
    toothDecay?: NullableStringFieldUpdateOperationsInput | string | null
    missingTeethCount?: NullableStringFieldUpdateOperationsInput | string | null
    prostheticsUsed?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dentalHistory?: DentalHistoryUncheckedUpdateManyWithoutPatientNestedInput
    medicalDocuments?: MedicalDocumentUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type UserUpsertWithoutDoctorAppointmentsInput = {
    update: XOR<UserUpdateWithoutDoctorAppointmentsInput, UserUncheckedUpdateWithoutDoctorAppointmentsInput>
    create: XOR<UserCreateWithoutDoctorAppointmentsInput, UserUncheckedCreateWithoutDoctorAppointmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDoctorAppointmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDoctorAppointmentsInput, UserUncheckedUpdateWithoutDoctorAppointmentsInput>
  }

  export type UserUpdateWithoutDoctorAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientProfile?: PatientProfileUpdateOneWithoutUserNestedInput
    employeeProfile?: EmployeeProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDoctorAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientProfile?: PatientProfileUncheckedUpdateOneWithoutUserNestedInput
    employeeProfile?: EmployeeProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type DentalHistoryUpsertWithoutAppointmentInput = {
    update: XOR<DentalHistoryUpdateWithoutAppointmentInput, DentalHistoryUncheckedUpdateWithoutAppointmentInput>
    create: XOR<DentalHistoryCreateWithoutAppointmentInput, DentalHistoryUncheckedCreateWithoutAppointmentInput>
    where?: DentalHistoryWhereInput
  }

  export type DentalHistoryUpdateToOneWithWhereWithoutAppointmentInput = {
    where?: DentalHistoryWhereInput
    data: XOR<DentalHistoryUpdateWithoutAppointmentInput, DentalHistoryUncheckedUpdateWithoutAppointmentInput>
  }

  export type DentalHistoryUpdateWithoutAppointmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    treatmentType?: StringFieldUpdateOperationsInput | string
    treatmentStatus?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientProfileUpdateOneRequiredWithoutDentalHistoryNestedInput
  }

  export type DentalHistoryUncheckedUpdateWithoutAppointmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    treatmentType?: StringFieldUpdateOperationsInput | string
    treatmentStatus?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientProfileCreateWithoutDentalHistoryInput = {
    id?: string
    address?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    insuranceProvider?: string | null
    insuranceNumber?: string | null
    bloodType?: $Enums.BloodType
    height?: string | null
    weight?: string | null
    bloodPressure?: string | null
    heartRate?: string | null
    bloodSugarLevel?: string | null
    allergies?: string | null
    medications?: string | null
    chronicDiseases?: string | null
    medicalHistory?: string | null
    lastDentalVisit?: Date | string | null
    gumCondition?: $Enums.GumCondition
    toothDecay?: string | null
    missingTeethCount?: string | null
    prostheticsUsed?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPatientProfileInput
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
    medicalDocuments?: MedicalDocumentCreateNestedManyWithoutPatientInput
  }

  export type PatientProfileUncheckedCreateWithoutDentalHistoryInput = {
    id?: string
    userId: string
    address?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    insuranceProvider?: string | null
    insuranceNumber?: string | null
    bloodType?: $Enums.BloodType
    height?: string | null
    weight?: string | null
    bloodPressure?: string | null
    heartRate?: string | null
    bloodSugarLevel?: string | null
    allergies?: string | null
    medications?: string | null
    chronicDiseases?: string | null
    medicalHistory?: string | null
    lastDentalVisit?: Date | string | null
    gumCondition?: $Enums.GumCondition
    toothDecay?: string | null
    missingTeethCount?: string | null
    prostheticsUsed?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    medicalDocuments?: MedicalDocumentUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientProfileCreateOrConnectWithoutDentalHistoryInput = {
    where: PatientProfileWhereUniqueInput
    create: XOR<PatientProfileCreateWithoutDentalHistoryInput, PatientProfileUncheckedCreateWithoutDentalHistoryInput>
  }

  export type AppointmentCreateWithoutDentalHistoryInput = {
    id?: string
    guestFirstName?: string | null
    guestLastName?: string | null
    guestEmail?: string | null
    guestPhone?: string | null
    date: Date | string
    time: string
    reason: string
    notes?: string | null
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    patient?: PatientProfileCreateNestedOneWithoutAppointmentsInput
    doctor?: UserCreateNestedOneWithoutDoctorAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutDentalHistoryInput = {
    id?: string
    patientId?: string | null
    guestFirstName?: string | null
    guestLastName?: string | null
    guestEmail?: string | null
    guestPhone?: string | null
    doctorId?: string | null
    date: Date | string
    time: string
    reason: string
    notes?: string | null
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutDentalHistoryInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutDentalHistoryInput, AppointmentUncheckedCreateWithoutDentalHistoryInput>
  }

  export type PatientProfileUpsertWithoutDentalHistoryInput = {
    update: XOR<PatientProfileUpdateWithoutDentalHistoryInput, PatientProfileUncheckedUpdateWithoutDentalHistoryInput>
    create: XOR<PatientProfileCreateWithoutDentalHistoryInput, PatientProfileUncheckedCreateWithoutDentalHistoryInput>
    where?: PatientProfileWhereInput
  }

  export type PatientProfileUpdateToOneWithWhereWithoutDentalHistoryInput = {
    where?: PatientProfileWhereInput
    data: XOR<PatientProfileUpdateWithoutDentalHistoryInput, PatientProfileUncheckedUpdateWithoutDentalHistoryInput>
  }

  export type PatientProfileUpdateWithoutDentalHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceProvider?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bloodType?: EnumBloodTypeFieldUpdateOperationsInput | $Enums.BloodType
    height?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: NullableStringFieldUpdateOperationsInput | string | null
    heartRate?: NullableStringFieldUpdateOperationsInput | string | null
    bloodSugarLevel?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDiseases?: NullableStringFieldUpdateOperationsInput | string | null
    medicalHistory?: NullableStringFieldUpdateOperationsInput | string | null
    lastDentalVisit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gumCondition?: EnumGumConditionFieldUpdateOperationsInput | $Enums.GumCondition
    toothDecay?: NullableStringFieldUpdateOperationsInput | string | null
    missingTeethCount?: NullableStringFieldUpdateOperationsInput | string | null
    prostheticsUsed?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPatientProfileNestedInput
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
    medicalDocuments?: MedicalDocumentUpdateManyWithoutPatientNestedInput
  }

  export type PatientProfileUncheckedUpdateWithoutDentalHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceProvider?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bloodType?: EnumBloodTypeFieldUpdateOperationsInput | $Enums.BloodType
    height?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: NullableStringFieldUpdateOperationsInput | string | null
    heartRate?: NullableStringFieldUpdateOperationsInput | string | null
    bloodSugarLevel?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDiseases?: NullableStringFieldUpdateOperationsInput | string | null
    medicalHistory?: NullableStringFieldUpdateOperationsInput | string | null
    lastDentalVisit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gumCondition?: EnumGumConditionFieldUpdateOperationsInput | $Enums.GumCondition
    toothDecay?: NullableStringFieldUpdateOperationsInput | string | null
    missingTeethCount?: NullableStringFieldUpdateOperationsInput | string | null
    prostheticsUsed?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    medicalDocuments?: MedicalDocumentUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type AppointmentUpsertWithoutDentalHistoryInput = {
    update: XOR<AppointmentUpdateWithoutDentalHistoryInput, AppointmentUncheckedUpdateWithoutDentalHistoryInput>
    create: XOR<AppointmentCreateWithoutDentalHistoryInput, AppointmentUncheckedCreateWithoutDentalHistoryInput>
    where?: AppointmentWhereInput
  }

  export type AppointmentUpdateToOneWithWhereWithoutDentalHistoryInput = {
    where?: AppointmentWhereInput
    data: XOR<AppointmentUpdateWithoutDentalHistoryInput, AppointmentUncheckedUpdateWithoutDentalHistoryInput>
  }

  export type AppointmentUpdateWithoutDentalHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    guestFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    guestLastName?: NullableStringFieldUpdateOperationsInput | string | null
    guestEmail?: NullableStringFieldUpdateOperationsInput | string | null
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientProfileUpdateOneWithoutAppointmentsNestedInput
    doctor?: UserUpdateOneWithoutDoctorAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutDentalHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: NullableStringFieldUpdateOperationsInput | string | null
    guestFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    guestLastName?: NullableStringFieldUpdateOperationsInput | string | null
    guestEmail?: NullableStringFieldUpdateOperationsInput | string | null
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    doctorId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientProfileCreateWithoutMedicalDocumentsInput = {
    id?: string
    address?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    insuranceProvider?: string | null
    insuranceNumber?: string | null
    bloodType?: $Enums.BloodType
    height?: string | null
    weight?: string | null
    bloodPressure?: string | null
    heartRate?: string | null
    bloodSugarLevel?: string | null
    allergies?: string | null
    medications?: string | null
    chronicDiseases?: string | null
    medicalHistory?: string | null
    lastDentalVisit?: Date | string | null
    gumCondition?: $Enums.GumCondition
    toothDecay?: string | null
    missingTeethCount?: string | null
    prostheticsUsed?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPatientProfileInput
    appointments?: AppointmentCreateNestedManyWithoutPatientInput
    dentalHistory?: DentalHistoryCreateNestedManyWithoutPatientInput
  }

  export type PatientProfileUncheckedCreateWithoutMedicalDocumentsInput = {
    id?: string
    userId: string
    address?: string | null
    gender?: $Enums.Gender | null
    dateOfBirth?: Date | string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    insuranceProvider?: string | null
    insuranceNumber?: string | null
    bloodType?: $Enums.BloodType
    height?: string | null
    weight?: string | null
    bloodPressure?: string | null
    heartRate?: string | null
    bloodSugarLevel?: string | null
    allergies?: string | null
    medications?: string | null
    chronicDiseases?: string | null
    medicalHistory?: string | null
    lastDentalVisit?: Date | string | null
    gumCondition?: $Enums.GumCondition
    toothDecay?: string | null
    missingTeethCount?: string | null
    prostheticsUsed?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    dentalHistory?: DentalHistoryUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientProfileCreateOrConnectWithoutMedicalDocumentsInput = {
    where: PatientProfileWhereUniqueInput
    create: XOR<PatientProfileCreateWithoutMedicalDocumentsInput, PatientProfileUncheckedCreateWithoutMedicalDocumentsInput>
  }

  export type PatientProfileUpsertWithoutMedicalDocumentsInput = {
    update: XOR<PatientProfileUpdateWithoutMedicalDocumentsInput, PatientProfileUncheckedUpdateWithoutMedicalDocumentsInput>
    create: XOR<PatientProfileCreateWithoutMedicalDocumentsInput, PatientProfileUncheckedCreateWithoutMedicalDocumentsInput>
    where?: PatientProfileWhereInput
  }

  export type PatientProfileUpdateToOneWithWhereWithoutMedicalDocumentsInput = {
    where?: PatientProfileWhereInput
    data: XOR<PatientProfileUpdateWithoutMedicalDocumentsInput, PatientProfileUncheckedUpdateWithoutMedicalDocumentsInput>
  }

  export type PatientProfileUpdateWithoutMedicalDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceProvider?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bloodType?: EnumBloodTypeFieldUpdateOperationsInput | $Enums.BloodType
    height?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: NullableStringFieldUpdateOperationsInput | string | null
    heartRate?: NullableStringFieldUpdateOperationsInput | string | null
    bloodSugarLevel?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDiseases?: NullableStringFieldUpdateOperationsInput | string | null
    medicalHistory?: NullableStringFieldUpdateOperationsInput | string | null
    lastDentalVisit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gumCondition?: EnumGumConditionFieldUpdateOperationsInput | $Enums.GumCondition
    toothDecay?: NullableStringFieldUpdateOperationsInput | string | null
    missingTeethCount?: NullableStringFieldUpdateOperationsInput | string | null
    prostheticsUsed?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPatientProfileNestedInput
    appointments?: AppointmentUpdateManyWithoutPatientNestedInput
    dentalHistory?: DentalHistoryUpdateManyWithoutPatientNestedInput
  }

  export type PatientProfileUncheckedUpdateWithoutMedicalDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceProvider?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    bloodType?: EnumBloodTypeFieldUpdateOperationsInput | $Enums.BloodType
    height?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: NullableStringFieldUpdateOperationsInput | string | null
    heartRate?: NullableStringFieldUpdateOperationsInput | string | null
    bloodSugarLevel?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    chronicDiseases?: NullableStringFieldUpdateOperationsInput | string | null
    medicalHistory?: NullableStringFieldUpdateOperationsInput | string | null
    lastDentalVisit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gumCondition?: EnumGumConditionFieldUpdateOperationsInput | $Enums.GumCondition
    toothDecay?: NullableStringFieldUpdateOperationsInput | string | null
    missingTeethCount?: NullableStringFieldUpdateOperationsInput | string | null
    prostheticsUsed?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    dentalHistory?: DentalHistoryUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type AppointmentCreateManyDoctorInput = {
    id?: string
    patientId?: string | null
    guestFirstName?: string | null
    guestLastName?: string | null
    guestEmail?: string | null
    guestPhone?: string | null
    date: Date | string
    time: string
    reason: string
    notes?: string | null
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    guestFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    guestLastName?: NullableStringFieldUpdateOperationsInput | string | null
    guestEmail?: NullableStringFieldUpdateOperationsInput | string | null
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientProfileUpdateOneWithoutAppointmentsNestedInput
    dentalHistory?: DentalHistoryUpdateOneWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: NullableStringFieldUpdateOperationsInput | string | null
    guestFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    guestLastName?: NullableStringFieldUpdateOperationsInput | string | null
    guestEmail?: NullableStringFieldUpdateOperationsInput | string | null
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dentalHistory?: DentalHistoryUncheckedUpdateOneWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateManyWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: NullableStringFieldUpdateOperationsInput | string | null
    guestFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    guestLastName?: NullableStringFieldUpdateOperationsInput | string | null
    guestEmail?: NullableStringFieldUpdateOperationsInput | string | null
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyPatientInput = {
    id?: string
    guestFirstName?: string | null
    guestLastName?: string | null
    guestEmail?: string | null
    guestPhone?: string | null
    doctorId?: string | null
    date: Date | string
    time: string
    reason: string
    notes?: string | null
    status?: $Enums.AppointmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DentalHistoryCreateManyPatientInput = {
    id?: string
    appointmentId?: string | null
    treatmentType: string
    treatmentStatus?: $Enums.TreatmentStatus
    paymentStatus?: $Enums.PaymentStatus
    date?: Date | string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MedicalDocumentCreateManyPatientInput = {
    id?: string
    name: string
    fileUrl: string
    sizeBytes: number
    type: string
    uploadedAt?: Date | string
  }

  export type AppointmentUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    guestFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    guestLastName?: NullableStringFieldUpdateOperationsInput | string | null
    guestEmail?: NullableStringFieldUpdateOperationsInput | string | null
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctor?: UserUpdateOneWithoutDoctorAppointmentsNestedInput
    dentalHistory?: DentalHistoryUpdateOneWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    guestFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    guestLastName?: NullableStringFieldUpdateOperationsInput | string | null
    guestEmail?: NullableStringFieldUpdateOperationsInput | string | null
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    doctorId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dentalHistory?: DentalHistoryUncheckedUpdateOneWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    guestFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    guestLastName?: NullableStringFieldUpdateOperationsInput | string | null
    guestEmail?: NullableStringFieldUpdateOperationsInput | string | null
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    doctorId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DentalHistoryUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    treatmentType?: StringFieldUpdateOperationsInput | string
    treatmentStatus?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointment?: AppointmentUpdateOneWithoutDentalHistoryNestedInput
  }

  export type DentalHistoryUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: NullableStringFieldUpdateOperationsInput | string | null
    treatmentType?: StringFieldUpdateOperationsInput | string
    treatmentStatus?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DentalHistoryUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    appointmentId?: NullableStringFieldUpdateOperationsInput | string | null
    treatmentType?: StringFieldUpdateOperationsInput | string
    treatmentStatus?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicalDocumentUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicalDocumentUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicalDocumentUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}