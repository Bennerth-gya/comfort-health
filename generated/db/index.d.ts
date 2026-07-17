
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
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model OrderStatusLog
 * 
 */
export type OrderStatusLog = $Result.DefaultSelection<Prisma.$OrderStatusLogPayload>
/**
 * Model Rider
 * 
 */
export type Rider = $Result.DefaultSelection<Prisma.$RiderPayload>
/**
 * Model OrderItem
 * 
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>
/**
 * Model PaymentTransaction
 * 
 */
export type PaymentTransaction = $Result.DefaultSelection<Prisma.$PaymentTransactionPayload>
/**
 * Model HeroSlide
 * 
 */
export type HeroSlide = $Result.DefaultSelection<Prisma.$HeroSlidePayload>
/**
 * Model SupportConversation
 * 
 */
export type SupportConversation = $Result.DefaultSelection<Prisma.$SupportConversationPayload>
/**
 * Model SupportMessage
 * 
 */
export type SupportMessage = $Result.DefaultSelection<Prisma.$SupportMessagePayload>
/**
 * Model CustomerReview
 * 
 */
export type CustomerReview = $Result.DefaultSelection<Prisma.$CustomerReviewPayload>
/**
 * Model ProductRequest
 * 
 */
export type ProductRequest = $Result.DefaultSelection<Prisma.$ProductRequestPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const OrderStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PREPARING: 'PREPARING',
  ASSIGNED: 'ASSIGNED',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]


export const ConversationStatus: {
  WAITING: 'WAITING',
  ACTIVE: 'ACTIVE',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED'
};

export type ConversationStatus = (typeof ConversationStatus)[keyof typeof ConversationStatus]


export const SenderType: {
  STUDENT: 'STUDENT',
  PHARMACIST: 'PHARMACIST',
  SYSTEM: 'SYSTEM'
};

export type SenderType = (typeof SenderType)[keyof typeof SenderType]


export const MessageType: {
  TEXT: 'TEXT',
  PRODUCT_RECOMMENDATION: 'PRODUCT_RECOMMENDATION',
  SYSTEM_NOTICE: 'SYSTEM_NOTICE'
};

export type MessageType = (typeof MessageType)[keyof typeof MessageType]


export const ProductRequestStatus: {
  PENDING: 'PENDING',
  NOTED: 'NOTED',
  ADDED: 'ADDED',
  UNAVAILABLE: 'UNAVAILABLE'
};

export type ProductRequestStatus = (typeof ProductRequestStatus)[keyof typeof ProductRequestStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

export type ConversationStatus = $Enums.ConversationStatus

export const ConversationStatus: typeof $Enums.ConversationStatus

export type SenderType = $Enums.SenderType

export const SenderType: typeof $Enums.SenderType

export type MessageType = $Enums.MessageType

export const MessageType: typeof $Enums.MessageType

export type ProductRequestStatus = $Enums.ProductRequestStatus

export const ProductRequestStatus: typeof $Enums.ProductRequestStatus

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
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderStatusLog`: Exposes CRUD operations for the **OrderStatusLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderStatusLogs
    * const orderStatusLogs = await prisma.orderStatusLog.findMany()
    * ```
    */
  get orderStatusLog(): Prisma.OrderStatusLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rider`: Exposes CRUD operations for the **Rider** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Riders
    * const riders = await prisma.rider.findMany()
    * ```
    */
  get rider(): Prisma.RiderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderItems
    * const orderItems = await prisma.orderItem.findMany()
    * ```
    */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.paymentTransaction`: Exposes CRUD operations for the **PaymentTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PaymentTransactions
    * const paymentTransactions = await prisma.paymentTransaction.findMany()
    * ```
    */
  get paymentTransaction(): Prisma.PaymentTransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.heroSlide`: Exposes CRUD operations for the **HeroSlide** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HeroSlides
    * const heroSlides = await prisma.heroSlide.findMany()
    * ```
    */
  get heroSlide(): Prisma.HeroSlideDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.supportConversation`: Exposes CRUD operations for the **SupportConversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SupportConversations
    * const supportConversations = await prisma.supportConversation.findMany()
    * ```
    */
  get supportConversation(): Prisma.SupportConversationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.supportMessage`: Exposes CRUD operations for the **SupportMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SupportMessages
    * const supportMessages = await prisma.supportMessage.findMany()
    * ```
    */
  get supportMessage(): Prisma.SupportMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customerReview`: Exposes CRUD operations for the **CustomerReview** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomerReviews
    * const customerReviews = await prisma.customerReview.findMany()
    * ```
    */
  get customerReview(): Prisma.CustomerReviewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productRequest`: Exposes CRUD operations for the **ProductRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductRequests
    * const productRequests = await prisma.productRequest.findMany()
    * ```
    */
  get productRequest(): Prisma.ProductRequestDelegate<ExtArgs, ClientOptions>;
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
    Product: 'Product',
    Order: 'Order',
    OrderStatusLog: 'OrderStatusLog',
    Rider: 'Rider',
    OrderItem: 'OrderItem',
    PaymentTransaction: 'PaymentTransaction',
    HeroSlide: 'HeroSlide',
    SupportConversation: 'SupportConversation',
    SupportMessage: 'SupportMessage',
    CustomerReview: 'CustomerReview',
    ProductRequest: 'ProductRequest'
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
      modelProps: "user" | "product" | "order" | "orderStatusLog" | "rider" | "orderItem" | "paymentTransaction" | "heroSlide" | "supportConversation" | "supportMessage" | "customerReview" | "productRequest"
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
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      OrderStatusLog: {
        payload: Prisma.$OrderStatusLogPayload<ExtArgs>
        fields: Prisma.OrderStatusLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderStatusLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderStatusLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusLogPayload>
          }
          findFirst: {
            args: Prisma.OrderStatusLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderStatusLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusLogPayload>
          }
          findMany: {
            args: Prisma.OrderStatusLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusLogPayload>[]
          }
          create: {
            args: Prisma.OrderStatusLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusLogPayload>
          }
          createMany: {
            args: Prisma.OrderStatusLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderStatusLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusLogPayload>[]
          }
          delete: {
            args: Prisma.OrderStatusLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusLogPayload>
          }
          update: {
            args: Prisma.OrderStatusLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusLogPayload>
          }
          deleteMany: {
            args: Prisma.OrderStatusLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderStatusLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderStatusLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusLogPayload>[]
          }
          upsert: {
            args: Prisma.OrderStatusLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusLogPayload>
          }
          aggregate: {
            args: Prisma.OrderStatusLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderStatusLog>
          }
          groupBy: {
            args: Prisma.OrderStatusLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderStatusLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderStatusLogCountArgs<ExtArgs>
            result: $Utils.Optional<OrderStatusLogCountAggregateOutputType> | number
          }
        }
      }
      Rider: {
        payload: Prisma.$RiderPayload<ExtArgs>
        fields: Prisma.RiderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RiderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RiderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiderPayload>
          }
          findFirst: {
            args: Prisma.RiderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RiderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiderPayload>
          }
          findMany: {
            args: Prisma.RiderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiderPayload>[]
          }
          create: {
            args: Prisma.RiderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiderPayload>
          }
          createMany: {
            args: Prisma.RiderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RiderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiderPayload>[]
          }
          delete: {
            args: Prisma.RiderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiderPayload>
          }
          update: {
            args: Prisma.RiderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiderPayload>
          }
          deleteMany: {
            args: Prisma.RiderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RiderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RiderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiderPayload>[]
          }
          upsert: {
            args: Prisma.RiderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiderPayload>
          }
          aggregate: {
            args: Prisma.RiderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRider>
          }
          groupBy: {
            args: Prisma.RiderGroupByArgs<ExtArgs>
            result: $Utils.Optional<RiderGroupByOutputType>[]
          }
          count: {
            args: Prisma.RiderCountArgs<ExtArgs>
            result: $Utils.Optional<RiderCountAggregateOutputType> | number
          }
        }
      }
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>
        fields: Prisma.OrderItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderItem>
          }
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number
          }
        }
      }
      PaymentTransaction: {
        payload: Prisma.$PaymentTransactionPayload<ExtArgs>
        fields: Prisma.PaymentTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>
          }
          findFirst: {
            args: Prisma.PaymentTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>
          }
          findMany: {
            args: Prisma.PaymentTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>[]
          }
          create: {
            args: Prisma.PaymentTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>
          }
          createMany: {
            args: Prisma.PaymentTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>[]
          }
          delete: {
            args: Prisma.PaymentTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>
          }
          update: {
            args: Prisma.PaymentTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>
          }
          deleteMany: {
            args: Prisma.PaymentTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>[]
          }
          upsert: {
            args: Prisma.PaymentTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentTransactionPayload>
          }
          aggregate: {
            args: Prisma.PaymentTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaymentTransaction>
          }
          groupBy: {
            args: Prisma.PaymentTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentTransactionCountAggregateOutputType> | number
          }
        }
      }
      HeroSlide: {
        payload: Prisma.$HeroSlidePayload<ExtArgs>
        fields: Prisma.HeroSlideFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HeroSlideFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroSlidePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HeroSlideFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroSlidePayload>
          }
          findFirst: {
            args: Prisma.HeroSlideFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroSlidePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HeroSlideFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroSlidePayload>
          }
          findMany: {
            args: Prisma.HeroSlideFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroSlidePayload>[]
          }
          create: {
            args: Prisma.HeroSlideCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroSlidePayload>
          }
          createMany: {
            args: Prisma.HeroSlideCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HeroSlideCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroSlidePayload>[]
          }
          delete: {
            args: Prisma.HeroSlideDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroSlidePayload>
          }
          update: {
            args: Prisma.HeroSlideUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroSlidePayload>
          }
          deleteMany: {
            args: Prisma.HeroSlideDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HeroSlideUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HeroSlideUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroSlidePayload>[]
          }
          upsert: {
            args: Prisma.HeroSlideUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroSlidePayload>
          }
          aggregate: {
            args: Prisma.HeroSlideAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHeroSlide>
          }
          groupBy: {
            args: Prisma.HeroSlideGroupByArgs<ExtArgs>
            result: $Utils.Optional<HeroSlideGroupByOutputType>[]
          }
          count: {
            args: Prisma.HeroSlideCountArgs<ExtArgs>
            result: $Utils.Optional<HeroSlideCountAggregateOutputType> | number
          }
        }
      }
      SupportConversation: {
        payload: Prisma.$SupportConversationPayload<ExtArgs>
        fields: Prisma.SupportConversationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupportConversationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupportConversationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportConversationPayload>
          }
          findFirst: {
            args: Prisma.SupportConversationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupportConversationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportConversationPayload>
          }
          findMany: {
            args: Prisma.SupportConversationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportConversationPayload>[]
          }
          create: {
            args: Prisma.SupportConversationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportConversationPayload>
          }
          createMany: {
            args: Prisma.SupportConversationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SupportConversationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportConversationPayload>[]
          }
          delete: {
            args: Prisma.SupportConversationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportConversationPayload>
          }
          update: {
            args: Prisma.SupportConversationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportConversationPayload>
          }
          deleteMany: {
            args: Prisma.SupportConversationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupportConversationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SupportConversationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportConversationPayload>[]
          }
          upsert: {
            args: Prisma.SupportConversationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportConversationPayload>
          }
          aggregate: {
            args: Prisma.SupportConversationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupportConversation>
          }
          groupBy: {
            args: Prisma.SupportConversationGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupportConversationGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupportConversationCountArgs<ExtArgs>
            result: $Utils.Optional<SupportConversationCountAggregateOutputType> | number
          }
        }
      }
      SupportMessage: {
        payload: Prisma.$SupportMessagePayload<ExtArgs>
        fields: Prisma.SupportMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupportMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupportMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>
          }
          findFirst: {
            args: Prisma.SupportMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupportMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>
          }
          findMany: {
            args: Prisma.SupportMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>[]
          }
          create: {
            args: Prisma.SupportMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>
          }
          createMany: {
            args: Prisma.SupportMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SupportMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>[]
          }
          delete: {
            args: Prisma.SupportMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>
          }
          update: {
            args: Prisma.SupportMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>
          }
          deleteMany: {
            args: Prisma.SupportMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupportMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SupportMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>[]
          }
          upsert: {
            args: Prisma.SupportMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportMessagePayload>
          }
          aggregate: {
            args: Prisma.SupportMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupportMessage>
          }
          groupBy: {
            args: Prisma.SupportMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupportMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupportMessageCountArgs<ExtArgs>
            result: $Utils.Optional<SupportMessageCountAggregateOutputType> | number
          }
        }
      }
      CustomerReview: {
        payload: Prisma.$CustomerReviewPayload<ExtArgs>
        fields: Prisma.CustomerReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerReviewPayload>
          }
          findFirst: {
            args: Prisma.CustomerReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerReviewPayload>
          }
          findMany: {
            args: Prisma.CustomerReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerReviewPayload>[]
          }
          create: {
            args: Prisma.CustomerReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerReviewPayload>
          }
          createMany: {
            args: Prisma.CustomerReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerReviewPayload>[]
          }
          delete: {
            args: Prisma.CustomerReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerReviewPayload>
          }
          update: {
            args: Prisma.CustomerReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerReviewPayload>
          }
          deleteMany: {
            args: Prisma.CustomerReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerReviewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerReviewPayload>[]
          }
          upsert: {
            args: Prisma.CustomerReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerReviewPayload>
          }
          aggregate: {
            args: Prisma.CustomerReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomerReview>
          }
          groupBy: {
            args: Prisma.CustomerReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerReviewCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerReviewCountAggregateOutputType> | number
          }
        }
      }
      ProductRequest: {
        payload: Prisma.$ProductRequestPayload<ExtArgs>
        fields: Prisma.ProductRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductRequestPayload>
          }
          findFirst: {
            args: Prisma.ProductRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductRequestPayload>
          }
          findMany: {
            args: Prisma.ProductRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductRequestPayload>[]
          }
          create: {
            args: Prisma.ProductRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductRequestPayload>
          }
          createMany: {
            args: Prisma.ProductRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductRequestPayload>[]
          }
          delete: {
            args: Prisma.ProductRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductRequestPayload>
          }
          update: {
            args: Prisma.ProductRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductRequestPayload>
          }
          deleteMany: {
            args: Prisma.ProductRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductRequestPayload>[]
          }
          upsert: {
            args: Prisma.ProductRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductRequestPayload>
          }
          aggregate: {
            args: Prisma.ProductRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductRequest>
          }
          groupBy: {
            args: Prisma.ProductRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductRequestCountArgs<ExtArgs>
            result: $Utils.Optional<ProductRequestCountAggregateOutputType> | number
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
    product?: ProductOmit
    order?: OrderOmit
    orderStatusLog?: OrderStatusLogOmit
    rider?: RiderOmit
    orderItem?: OrderItemOmit
    paymentTransaction?: PaymentTransactionOmit
    heroSlide?: HeroSlideOmit
    supportConversation?: SupportConversationOmit
    supportMessage?: SupportMessageOmit
    customerReview?: CustomerReviewOmit
    productRequest?: ProductRequestOmit
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
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    orderItems: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orderItems?: boolean | ProductCountOutputTypeCountOrderItemsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountOrderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    items: number
    statusHistory: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | OrderCountOutputTypeCountItemsArgs
    statusHistory?: boolean | OrderCountOutputTypeCountStatusHistoryArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountStatusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderStatusLogWhereInput
  }


  /**
   * Count Type RiderCountOutputType
   */

  export type RiderCountOutputType = {
    orders: number
  }

  export type RiderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | RiderCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * RiderCountOutputType without action
   */
  export type RiderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiderCountOutputType
     */
    select?: RiderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RiderCountOutputType without action
   */
  export type RiderCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Count Type SupportConversationCountOutputType
   */

  export type SupportConversationCountOutputType = {
    messages: number
  }

  export type SupportConversationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | SupportConversationCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * SupportConversationCountOutputType without action
   */
  export type SupportConversationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportConversationCountOutputType
     */
    select?: SupportConversationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SupportConversationCountOutputType without action
   */
  export type SupportConversationCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportMessageWhereInput
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
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
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
    email: string | null
    role: $Enums.UserRole
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
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string | null
      role: $Enums.UserRole
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
    readonly role: FieldRef<"User", 'UserRole'>
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
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    price: Decimal | null
    quantity: number | null
    lowStock: number | null
    featuredRank: number | null
  }

  export type ProductSumAggregateOutputType = {
    price: Decimal | null
    quantity: number | null
    lowStock: number | null
    featuredRank: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    description: string | null
    category: string | null
    sku: string | null
    price: Decimal | null
    quantity: number | null
    lowStock: number | null
    dosage: string | null
    manufacturer: string | null
    expiryDate: Date | null
    imageUrl: string | null
    prescriptionRequired: boolean | null
    activeListing: boolean | null
    isFeatured: boolean | null
    featuredRank: number | null
    createAt: Date | null
    updateAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    description: string | null
    category: string | null
    sku: string | null
    price: Decimal | null
    quantity: number | null
    lowStock: number | null
    dosage: string | null
    manufacturer: string | null
    expiryDate: Date | null
    imageUrl: string | null
    prescriptionRequired: boolean | null
    activeListing: boolean | null
    isFeatured: boolean | null
    featuredRank: number | null
    createAt: Date | null
    updateAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    description: number
    category: number
    sku: number
    price: number
    quantity: number
    lowStock: number
    dosage: number
    dosageGuide: number
    manufacturer: number
    expiryDate: number
    imageUrl: number
    prescriptionRequired: number
    activeListing: number
    isFeatured: number
    featuredRank: number
    createAt: number
    updateAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    price?: true
    quantity?: true
    lowStock?: true
    featuredRank?: true
  }

  export type ProductSumAggregateInputType = {
    price?: true
    quantity?: true
    lowStock?: true
    featuredRank?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    category?: true
    sku?: true
    price?: true
    quantity?: true
    lowStock?: true
    dosage?: true
    manufacturer?: true
    expiryDate?: true
    imageUrl?: true
    prescriptionRequired?: true
    activeListing?: true
    isFeatured?: true
    featuredRank?: true
    createAt?: true
    updateAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    category?: true
    sku?: true
    price?: true
    quantity?: true
    lowStock?: true
    dosage?: true
    manufacturer?: true
    expiryDate?: true
    imageUrl?: true
    prescriptionRequired?: true
    activeListing?: true
    isFeatured?: true
    featuredRank?: true
    createAt?: true
    updateAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    category?: true
    sku?: true
    price?: true
    quantity?: true
    lowStock?: true
    dosage?: true
    dosageGuide?: true
    manufacturer?: true
    expiryDate?: true
    imageUrl?: true
    prescriptionRequired?: true
    activeListing?: true
    isFeatured?: true
    featuredRank?: true
    createAt?: true
    updateAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    userId: string
    name: string
    description: string | null
    category: string | null
    sku: string | null
    price: Decimal
    quantity: number
    lowStock: number | null
    dosage: string | null
    dosageGuide: JsonValue | null
    manufacturer: string | null
    expiryDate: Date | null
    imageUrl: string | null
    prescriptionRequired: boolean
    activeListing: boolean
    isFeatured: boolean
    featuredRank: number | null
    createAt: Date
    updateAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    sku?: boolean
    price?: boolean
    quantity?: boolean
    lowStock?: boolean
    dosage?: boolean
    dosageGuide?: boolean
    manufacturer?: boolean
    expiryDate?: boolean
    imageUrl?: boolean
    prescriptionRequired?: boolean
    activeListing?: boolean
    isFeatured?: boolean
    featuredRank?: boolean
    createAt?: boolean
    updateAt?: boolean
    orderItems?: boolean | Product$orderItemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    sku?: boolean
    price?: boolean
    quantity?: boolean
    lowStock?: boolean
    dosage?: boolean
    dosageGuide?: boolean
    manufacturer?: boolean
    expiryDate?: boolean
    imageUrl?: boolean
    prescriptionRequired?: boolean
    activeListing?: boolean
    isFeatured?: boolean
    featuredRank?: boolean
    createAt?: boolean
    updateAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    sku?: boolean
    price?: boolean
    quantity?: boolean
    lowStock?: boolean
    dosage?: boolean
    dosageGuide?: boolean
    manufacturer?: boolean
    expiryDate?: boolean
    imageUrl?: boolean
    prescriptionRequired?: boolean
    activeListing?: boolean
    isFeatured?: boolean
    featuredRank?: boolean
    createAt?: boolean
    updateAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    sku?: boolean
    price?: boolean
    quantity?: boolean
    lowStock?: boolean
    dosage?: boolean
    dosageGuide?: boolean
    manufacturer?: boolean
    expiryDate?: boolean
    imageUrl?: boolean
    prescriptionRequired?: boolean
    activeListing?: boolean
    isFeatured?: boolean
    featuredRank?: boolean
    createAt?: boolean
    updateAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "description" | "category" | "sku" | "price" | "quantity" | "lowStock" | "dosage" | "dosageGuide" | "manufacturer" | "expiryDate" | "imageUrl" | "prescriptionRequired" | "activeListing" | "isFeatured" | "featuredRank" | "createAt" | "updateAt", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orderItems?: boolean | Product$orderItemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      orderItems: Prisma.$OrderItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      description: string | null
      category: string | null
      sku: string | null
      price: Prisma.Decimal
      quantity: number
      lowStock: number | null
      dosage: string | null
      dosageGuide: Prisma.JsonValue | null
      manufacturer: string | null
      expiryDate: Date | null
      imageUrl: string | null
      prescriptionRequired: boolean
      activeListing: boolean
      isFeatured: boolean
      featuredRank: number | null
      createAt: Date
      updateAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
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
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    orderItems<T extends Product$orderItemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$orderItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly userId: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly category: FieldRef<"Product", 'String'>
    readonly sku: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Decimal'>
    readonly quantity: FieldRef<"Product", 'Int'>
    readonly lowStock: FieldRef<"Product", 'Int'>
    readonly dosage: FieldRef<"Product", 'String'>
    readonly dosageGuide: FieldRef<"Product", 'Json'>
    readonly manufacturer: FieldRef<"Product", 'String'>
    readonly expiryDate: FieldRef<"Product", 'DateTime'>
    readonly imageUrl: FieldRef<"Product", 'String'>
    readonly prescriptionRequired: FieldRef<"Product", 'Boolean'>
    readonly activeListing: FieldRef<"Product", 'Boolean'>
    readonly isFeatured: FieldRef<"Product", 'Boolean'>
    readonly featuredRank: FieldRef<"Product", 'Int'>
    readonly createAt: FieldRef<"Product", 'DateTime'>
    readonly updateAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.orderItems
   */
  export type Product$orderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    amount: Decimal | null
    estimatedTime: number | null
  }

  export type OrderSumAggregateOutputType = {
    amount: Decimal | null
    estimatedTime: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    reference: string | null
    idempotencyKey: string | null
    sellerId: string | null
    email: string | null
    amount: Decimal | null
    currency: string | null
    status: string | null
    paidAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    fulfillmentStatus: $Enums.OrderStatus | null
    customerName: string | null
    customerPhone: string | null
    customerAddress: string | null
    riderId: string | null
    riderName: string | null
    riderPhone: string | null
    assignedAt: Date | null
    pickedUpAt: Date | null
    deliveredAt: Date | null
    estimatedTime: number | null
    adminNotes: string | null
    notificationSent: boolean | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    reference: string | null
    idempotencyKey: string | null
    sellerId: string | null
    email: string | null
    amount: Decimal | null
    currency: string | null
    status: string | null
    paidAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    fulfillmentStatus: $Enums.OrderStatus | null
    customerName: string | null
    customerPhone: string | null
    customerAddress: string | null
    riderId: string | null
    riderName: string | null
    riderPhone: string | null
    assignedAt: Date | null
    pickedUpAt: Date | null
    deliveredAt: Date | null
    estimatedTime: number | null
    adminNotes: string | null
    notificationSent: boolean | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    reference: number
    idempotencyKey: number
    sellerId: number
    email: number
    amount: number
    currency: number
    status: number
    paidAt: number
    createdAt: number
    updatedAt: number
    fulfillmentStatus: number
    customerName: number
    customerPhone: number
    customerAddress: number
    riderId: number
    riderName: number
    riderPhone: number
    assignedAt: number
    pickedUpAt: number
    deliveredAt: number
    estimatedTime: number
    adminNotes: number
    notificationSent: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    amount?: true
    estimatedTime?: true
  }

  export type OrderSumAggregateInputType = {
    amount?: true
    estimatedTime?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    reference?: true
    idempotencyKey?: true
    sellerId?: true
    email?: true
    amount?: true
    currency?: true
    status?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
    fulfillmentStatus?: true
    customerName?: true
    customerPhone?: true
    customerAddress?: true
    riderId?: true
    riderName?: true
    riderPhone?: true
    assignedAt?: true
    pickedUpAt?: true
    deliveredAt?: true
    estimatedTime?: true
    adminNotes?: true
    notificationSent?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    reference?: true
    idempotencyKey?: true
    sellerId?: true
    email?: true
    amount?: true
    currency?: true
    status?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
    fulfillmentStatus?: true
    customerName?: true
    customerPhone?: true
    customerAddress?: true
    riderId?: true
    riderName?: true
    riderPhone?: true
    assignedAt?: true
    pickedUpAt?: true
    deliveredAt?: true
    estimatedTime?: true
    adminNotes?: true
    notificationSent?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    reference?: true
    idempotencyKey?: true
    sellerId?: true
    email?: true
    amount?: true
    currency?: true
    status?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
    fulfillmentStatus?: true
    customerName?: true
    customerPhone?: true
    customerAddress?: true
    riderId?: true
    riderName?: true
    riderPhone?: true
    assignedAt?: true
    pickedUpAt?: true
    deliveredAt?: true
    estimatedTime?: true
    adminNotes?: true
    notificationSent?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    reference: string
    idempotencyKey: string | null
    sellerId: string | null
    email: string
    amount: Decimal
    currency: string
    status: string
    paidAt: Date | null
    createdAt: Date
    updatedAt: Date
    fulfillmentStatus: $Enums.OrderStatus
    customerName: string | null
    customerPhone: string | null
    customerAddress: string | null
    riderId: string | null
    riderName: string | null
    riderPhone: string | null
    assignedAt: Date | null
    pickedUpAt: Date | null
    deliveredAt: Date | null
    estimatedTime: number | null
    adminNotes: string | null
    notificationSent: boolean
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reference?: boolean
    idempotencyKey?: boolean
    sellerId?: boolean
    email?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fulfillmentStatus?: boolean
    customerName?: boolean
    customerPhone?: boolean
    customerAddress?: boolean
    riderId?: boolean
    riderName?: boolean
    riderPhone?: boolean
    assignedAt?: boolean
    pickedUpAt?: boolean
    deliveredAt?: boolean
    estimatedTime?: boolean
    adminNotes?: boolean
    notificationSent?: boolean
    items?: boolean | Order$itemsArgs<ExtArgs>
    payment?: boolean | Order$paymentArgs<ExtArgs>
    statusHistory?: boolean | Order$statusHistoryArgs<ExtArgs>
    rider?: boolean | Order$riderArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reference?: boolean
    idempotencyKey?: boolean
    sellerId?: boolean
    email?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fulfillmentStatus?: boolean
    customerName?: boolean
    customerPhone?: boolean
    customerAddress?: boolean
    riderId?: boolean
    riderName?: boolean
    riderPhone?: boolean
    assignedAt?: boolean
    pickedUpAt?: boolean
    deliveredAt?: boolean
    estimatedTime?: boolean
    adminNotes?: boolean
    notificationSent?: boolean
    rider?: boolean | Order$riderArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reference?: boolean
    idempotencyKey?: boolean
    sellerId?: boolean
    email?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fulfillmentStatus?: boolean
    customerName?: boolean
    customerPhone?: boolean
    customerAddress?: boolean
    riderId?: boolean
    riderName?: boolean
    riderPhone?: boolean
    assignedAt?: boolean
    pickedUpAt?: boolean
    deliveredAt?: boolean
    estimatedTime?: boolean
    adminNotes?: boolean
    notificationSent?: boolean
    rider?: boolean | Order$riderArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    reference?: boolean
    idempotencyKey?: boolean
    sellerId?: boolean
    email?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fulfillmentStatus?: boolean
    customerName?: boolean
    customerPhone?: boolean
    customerAddress?: boolean
    riderId?: boolean
    riderName?: boolean
    riderPhone?: boolean
    assignedAt?: boolean
    pickedUpAt?: boolean
    deliveredAt?: boolean
    estimatedTime?: boolean
    adminNotes?: boolean
    notificationSent?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "reference" | "idempotencyKey" | "sellerId" | "email" | "amount" | "currency" | "status" | "paidAt" | "createdAt" | "updatedAt" | "fulfillmentStatus" | "customerName" | "customerPhone" | "customerAddress" | "riderId" | "riderName" | "riderPhone" | "assignedAt" | "pickedUpAt" | "deliveredAt" | "estimatedTime" | "adminNotes" | "notificationSent", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | Order$itemsArgs<ExtArgs>
    payment?: boolean | Order$paymentArgs<ExtArgs>
    statusHistory?: boolean | Order$statusHistoryArgs<ExtArgs>
    rider?: boolean | Order$riderArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rider?: boolean | Order$riderArgs<ExtArgs>
  }
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rider?: boolean | Order$riderArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      items: Prisma.$OrderItemPayload<ExtArgs>[]
      payment: Prisma.$PaymentTransactionPayload<ExtArgs> | null
      statusHistory: Prisma.$OrderStatusLogPayload<ExtArgs>[]
      rider: Prisma.$RiderPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      reference: string
      idempotencyKey: string | null
      sellerId: string | null
      email: string
      amount: Prisma.Decimal
      currency: string
      status: string
      paidAt: Date | null
      createdAt: Date
      updatedAt: Date
      fulfillmentStatus: $Enums.OrderStatus
      customerName: string | null
      customerPhone: string | null
      customerAddress: string | null
      riderId: string | null
      riderName: string | null
      riderPhone: string | null
      assignedAt: Date | null
      pickedUpAt: Date | null
      deliveredAt: Date | null
      estimatedTime: number | null
      adminNotes: string | null
      notificationSent: boolean
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.updateManyAndReturn({
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
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
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
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    items<T extends Order$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Order$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payment<T extends Order$paymentArgs<ExtArgs> = {}>(args?: Subset<T, Order$paymentArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    statusHistory<T extends Order$statusHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Order$statusHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderStatusLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rider<T extends Order$riderArgs<ExtArgs> = {}>(args?: Subset<T, Order$riderArgs<ExtArgs>>): Prisma__RiderClient<$Result.GetResult<Prisma.$RiderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly reference: FieldRef<"Order", 'String'>
    readonly idempotencyKey: FieldRef<"Order", 'String'>
    readonly sellerId: FieldRef<"Order", 'String'>
    readonly email: FieldRef<"Order", 'String'>
    readonly amount: FieldRef<"Order", 'Decimal'>
    readonly currency: FieldRef<"Order", 'String'>
    readonly status: FieldRef<"Order", 'String'>
    readonly paidAt: FieldRef<"Order", 'DateTime'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
    readonly fulfillmentStatus: FieldRef<"Order", 'OrderStatus'>
    readonly customerName: FieldRef<"Order", 'String'>
    readonly customerPhone: FieldRef<"Order", 'String'>
    readonly customerAddress: FieldRef<"Order", 'String'>
    readonly riderId: FieldRef<"Order", 'String'>
    readonly riderName: FieldRef<"Order", 'String'>
    readonly riderPhone: FieldRef<"Order", 'String'>
    readonly assignedAt: FieldRef<"Order", 'DateTime'>
    readonly pickedUpAt: FieldRef<"Order", 'DateTime'>
    readonly deliveredAt: FieldRef<"Order", 'DateTime'>
    readonly estimatedTime: FieldRef<"Order", 'Int'>
    readonly adminNotes: FieldRef<"Order", 'String'>
    readonly notificationSent: FieldRef<"Order", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.items
   */
  export type Order$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Order.payment
   */
  export type Order$paymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    where?: PaymentTransactionWhereInput
  }

  /**
   * Order.statusHistory
   */
  export type Order$statusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusLog
     */
    select?: OrderStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusLog
     */
    omit?: OrderStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusLogInclude<ExtArgs> | null
    where?: OrderStatusLogWhereInput
    orderBy?: OrderStatusLogOrderByWithRelationInput | OrderStatusLogOrderByWithRelationInput[]
    cursor?: OrderStatusLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderStatusLogScalarFieldEnum | OrderStatusLogScalarFieldEnum[]
  }

  /**
   * Order.rider
   */
  export type Order$riderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rider
     */
    select?: RiderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rider
     */
    omit?: RiderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiderInclude<ExtArgs> | null
    where?: RiderWhereInput
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model OrderStatusLog
   */

  export type AggregateOrderStatusLog = {
    _count: OrderStatusLogCountAggregateOutputType | null
    _min: OrderStatusLogMinAggregateOutputType | null
    _max: OrderStatusLogMaxAggregateOutputType | null
  }

  export type OrderStatusLogMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    status: $Enums.OrderStatus | null
    note: string | null
    createdAt: Date | null
  }

  export type OrderStatusLogMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    status: $Enums.OrderStatus | null
    note: string | null
    createdAt: Date | null
  }

  export type OrderStatusLogCountAggregateOutputType = {
    id: number
    orderId: number
    status: number
    note: number
    createdAt: number
    _all: number
  }


  export type OrderStatusLogMinAggregateInputType = {
    id?: true
    orderId?: true
    status?: true
    note?: true
    createdAt?: true
  }

  export type OrderStatusLogMaxAggregateInputType = {
    id?: true
    orderId?: true
    status?: true
    note?: true
    createdAt?: true
  }

  export type OrderStatusLogCountAggregateInputType = {
    id?: true
    orderId?: true
    status?: true
    note?: true
    createdAt?: true
    _all?: true
  }

  export type OrderStatusLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderStatusLog to aggregate.
     */
    where?: OrderStatusLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderStatusLogs to fetch.
     */
    orderBy?: OrderStatusLogOrderByWithRelationInput | OrderStatusLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderStatusLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderStatusLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderStatusLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderStatusLogs
    **/
    _count?: true | OrderStatusLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderStatusLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderStatusLogMaxAggregateInputType
  }

  export type GetOrderStatusLogAggregateType<T extends OrderStatusLogAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderStatusLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderStatusLog[P]>
      : GetScalarType<T[P], AggregateOrderStatusLog[P]>
  }




  export type OrderStatusLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderStatusLogWhereInput
    orderBy?: OrderStatusLogOrderByWithAggregationInput | OrderStatusLogOrderByWithAggregationInput[]
    by: OrderStatusLogScalarFieldEnum[] | OrderStatusLogScalarFieldEnum
    having?: OrderStatusLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderStatusLogCountAggregateInputType | true
    _min?: OrderStatusLogMinAggregateInputType
    _max?: OrderStatusLogMaxAggregateInputType
  }

  export type OrderStatusLogGroupByOutputType = {
    id: string
    orderId: string
    status: $Enums.OrderStatus
    note: string | null
    createdAt: Date
    _count: OrderStatusLogCountAggregateOutputType | null
    _min: OrderStatusLogMinAggregateOutputType | null
    _max: OrderStatusLogMaxAggregateOutputType | null
  }

  type GetOrderStatusLogGroupByPayload<T extends OrderStatusLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderStatusLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderStatusLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderStatusLogGroupByOutputType[P]>
            : GetScalarType<T[P], OrderStatusLogGroupByOutputType[P]>
        }
      >
    >


  export type OrderStatusLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    status?: boolean
    note?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderStatusLog"]>

  export type OrderStatusLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    status?: boolean
    note?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderStatusLog"]>

  export type OrderStatusLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    status?: boolean
    note?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderStatusLog"]>

  export type OrderStatusLogSelectScalar = {
    id?: boolean
    orderId?: boolean
    status?: boolean
    note?: boolean
    createdAt?: boolean
  }

  export type OrderStatusLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "status" | "note" | "createdAt", ExtArgs["result"]["orderStatusLog"]>
  export type OrderStatusLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type OrderStatusLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type OrderStatusLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $OrderStatusLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderStatusLog"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      status: $Enums.OrderStatus
      note: string | null
      createdAt: Date
    }, ExtArgs["result"]["orderStatusLog"]>
    composites: {}
  }

  type OrderStatusLogGetPayload<S extends boolean | null | undefined | OrderStatusLogDefaultArgs> = $Result.GetResult<Prisma.$OrderStatusLogPayload, S>

  type OrderStatusLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderStatusLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderStatusLogCountAggregateInputType | true
    }

  export interface OrderStatusLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderStatusLog'], meta: { name: 'OrderStatusLog' } }
    /**
     * Find zero or one OrderStatusLog that matches the filter.
     * @param {OrderStatusLogFindUniqueArgs} args - Arguments to find a OrderStatusLog
     * @example
     * // Get one OrderStatusLog
     * const orderStatusLog = await prisma.orderStatusLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderStatusLogFindUniqueArgs>(args: SelectSubset<T, OrderStatusLogFindUniqueArgs<ExtArgs>>): Prisma__OrderStatusLogClient<$Result.GetResult<Prisma.$OrderStatusLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderStatusLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderStatusLogFindUniqueOrThrowArgs} args - Arguments to find a OrderStatusLog
     * @example
     * // Get one OrderStatusLog
     * const orderStatusLog = await prisma.orderStatusLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderStatusLogFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderStatusLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderStatusLogClient<$Result.GetResult<Prisma.$OrderStatusLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderStatusLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderStatusLogFindFirstArgs} args - Arguments to find a OrderStatusLog
     * @example
     * // Get one OrderStatusLog
     * const orderStatusLog = await prisma.orderStatusLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderStatusLogFindFirstArgs>(args?: SelectSubset<T, OrderStatusLogFindFirstArgs<ExtArgs>>): Prisma__OrderStatusLogClient<$Result.GetResult<Prisma.$OrderStatusLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderStatusLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderStatusLogFindFirstOrThrowArgs} args - Arguments to find a OrderStatusLog
     * @example
     * // Get one OrderStatusLog
     * const orderStatusLog = await prisma.orderStatusLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderStatusLogFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderStatusLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderStatusLogClient<$Result.GetResult<Prisma.$OrderStatusLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderStatusLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderStatusLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderStatusLogs
     * const orderStatusLogs = await prisma.orderStatusLog.findMany()
     * 
     * // Get first 10 OrderStatusLogs
     * const orderStatusLogs = await prisma.orderStatusLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderStatusLogWithIdOnly = await prisma.orderStatusLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderStatusLogFindManyArgs>(args?: SelectSubset<T, OrderStatusLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderStatusLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderStatusLog.
     * @param {OrderStatusLogCreateArgs} args - Arguments to create a OrderStatusLog.
     * @example
     * // Create one OrderStatusLog
     * const OrderStatusLog = await prisma.orderStatusLog.create({
     *   data: {
     *     // ... data to create a OrderStatusLog
     *   }
     * })
     * 
     */
    create<T extends OrderStatusLogCreateArgs>(args: SelectSubset<T, OrderStatusLogCreateArgs<ExtArgs>>): Prisma__OrderStatusLogClient<$Result.GetResult<Prisma.$OrderStatusLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderStatusLogs.
     * @param {OrderStatusLogCreateManyArgs} args - Arguments to create many OrderStatusLogs.
     * @example
     * // Create many OrderStatusLogs
     * const orderStatusLog = await prisma.orderStatusLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderStatusLogCreateManyArgs>(args?: SelectSubset<T, OrderStatusLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderStatusLogs and returns the data saved in the database.
     * @param {OrderStatusLogCreateManyAndReturnArgs} args - Arguments to create many OrderStatusLogs.
     * @example
     * // Create many OrderStatusLogs
     * const orderStatusLog = await prisma.orderStatusLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderStatusLogs and only return the `id`
     * const orderStatusLogWithIdOnly = await prisma.orderStatusLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderStatusLogCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderStatusLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderStatusLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderStatusLog.
     * @param {OrderStatusLogDeleteArgs} args - Arguments to delete one OrderStatusLog.
     * @example
     * // Delete one OrderStatusLog
     * const OrderStatusLog = await prisma.orderStatusLog.delete({
     *   where: {
     *     // ... filter to delete one OrderStatusLog
     *   }
     * })
     * 
     */
    delete<T extends OrderStatusLogDeleteArgs>(args: SelectSubset<T, OrderStatusLogDeleteArgs<ExtArgs>>): Prisma__OrderStatusLogClient<$Result.GetResult<Prisma.$OrderStatusLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderStatusLog.
     * @param {OrderStatusLogUpdateArgs} args - Arguments to update one OrderStatusLog.
     * @example
     * // Update one OrderStatusLog
     * const orderStatusLog = await prisma.orderStatusLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderStatusLogUpdateArgs>(args: SelectSubset<T, OrderStatusLogUpdateArgs<ExtArgs>>): Prisma__OrderStatusLogClient<$Result.GetResult<Prisma.$OrderStatusLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderStatusLogs.
     * @param {OrderStatusLogDeleteManyArgs} args - Arguments to filter OrderStatusLogs to delete.
     * @example
     * // Delete a few OrderStatusLogs
     * const { count } = await prisma.orderStatusLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderStatusLogDeleteManyArgs>(args?: SelectSubset<T, OrderStatusLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderStatusLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderStatusLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderStatusLogs
     * const orderStatusLog = await prisma.orderStatusLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderStatusLogUpdateManyArgs>(args: SelectSubset<T, OrderStatusLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderStatusLogs and returns the data updated in the database.
     * @param {OrderStatusLogUpdateManyAndReturnArgs} args - Arguments to update many OrderStatusLogs.
     * @example
     * // Update many OrderStatusLogs
     * const orderStatusLog = await prisma.orderStatusLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderStatusLogs and only return the `id`
     * const orderStatusLogWithIdOnly = await prisma.orderStatusLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends OrderStatusLogUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderStatusLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderStatusLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderStatusLog.
     * @param {OrderStatusLogUpsertArgs} args - Arguments to update or create a OrderStatusLog.
     * @example
     * // Update or create a OrderStatusLog
     * const orderStatusLog = await prisma.orderStatusLog.upsert({
     *   create: {
     *     // ... data to create a OrderStatusLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderStatusLog we want to update
     *   }
     * })
     */
    upsert<T extends OrderStatusLogUpsertArgs>(args: SelectSubset<T, OrderStatusLogUpsertArgs<ExtArgs>>): Prisma__OrderStatusLogClient<$Result.GetResult<Prisma.$OrderStatusLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderStatusLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderStatusLogCountArgs} args - Arguments to filter OrderStatusLogs to count.
     * @example
     * // Count the number of OrderStatusLogs
     * const count = await prisma.orderStatusLog.count({
     *   where: {
     *     // ... the filter for the OrderStatusLogs we want to count
     *   }
     * })
    **/
    count<T extends OrderStatusLogCountArgs>(
      args?: Subset<T, OrderStatusLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderStatusLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderStatusLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderStatusLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderStatusLogAggregateArgs>(args: Subset<T, OrderStatusLogAggregateArgs>): Prisma.PrismaPromise<GetOrderStatusLogAggregateType<T>>

    /**
     * Group by OrderStatusLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderStatusLogGroupByArgs} args - Group by arguments.
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
      T extends OrderStatusLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderStatusLogGroupByArgs['orderBy'] }
        : { orderBy?: OrderStatusLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrderStatusLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderStatusLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderStatusLog model
   */
  readonly fields: OrderStatusLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderStatusLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderStatusLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the OrderStatusLog model
   */
  interface OrderStatusLogFieldRefs {
    readonly id: FieldRef<"OrderStatusLog", 'String'>
    readonly orderId: FieldRef<"OrderStatusLog", 'String'>
    readonly status: FieldRef<"OrderStatusLog", 'OrderStatus'>
    readonly note: FieldRef<"OrderStatusLog", 'String'>
    readonly createdAt: FieldRef<"OrderStatusLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrderStatusLog findUnique
   */
  export type OrderStatusLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusLog
     */
    select?: OrderStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusLog
     */
    omit?: OrderStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusLogInclude<ExtArgs> | null
    /**
     * Filter, which OrderStatusLog to fetch.
     */
    where: OrderStatusLogWhereUniqueInput
  }

  /**
   * OrderStatusLog findUniqueOrThrow
   */
  export type OrderStatusLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusLog
     */
    select?: OrderStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusLog
     */
    omit?: OrderStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusLogInclude<ExtArgs> | null
    /**
     * Filter, which OrderStatusLog to fetch.
     */
    where: OrderStatusLogWhereUniqueInput
  }

  /**
   * OrderStatusLog findFirst
   */
  export type OrderStatusLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusLog
     */
    select?: OrderStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusLog
     */
    omit?: OrderStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusLogInclude<ExtArgs> | null
    /**
     * Filter, which OrderStatusLog to fetch.
     */
    where?: OrderStatusLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderStatusLogs to fetch.
     */
    orderBy?: OrderStatusLogOrderByWithRelationInput | OrderStatusLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderStatusLogs.
     */
    cursor?: OrderStatusLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderStatusLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderStatusLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderStatusLogs.
     */
    distinct?: OrderStatusLogScalarFieldEnum | OrderStatusLogScalarFieldEnum[]
  }

  /**
   * OrderStatusLog findFirstOrThrow
   */
  export type OrderStatusLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusLog
     */
    select?: OrderStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusLog
     */
    omit?: OrderStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusLogInclude<ExtArgs> | null
    /**
     * Filter, which OrderStatusLog to fetch.
     */
    where?: OrderStatusLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderStatusLogs to fetch.
     */
    orderBy?: OrderStatusLogOrderByWithRelationInput | OrderStatusLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderStatusLogs.
     */
    cursor?: OrderStatusLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderStatusLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderStatusLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderStatusLogs.
     */
    distinct?: OrderStatusLogScalarFieldEnum | OrderStatusLogScalarFieldEnum[]
  }

  /**
   * OrderStatusLog findMany
   */
  export type OrderStatusLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusLog
     */
    select?: OrderStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusLog
     */
    omit?: OrderStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusLogInclude<ExtArgs> | null
    /**
     * Filter, which OrderStatusLogs to fetch.
     */
    where?: OrderStatusLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderStatusLogs to fetch.
     */
    orderBy?: OrderStatusLogOrderByWithRelationInput | OrderStatusLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderStatusLogs.
     */
    cursor?: OrderStatusLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderStatusLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderStatusLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderStatusLogs.
     */
    distinct?: OrderStatusLogScalarFieldEnum | OrderStatusLogScalarFieldEnum[]
  }

  /**
   * OrderStatusLog create
   */
  export type OrderStatusLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusLog
     */
    select?: OrderStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusLog
     */
    omit?: OrderStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusLogInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderStatusLog.
     */
    data: XOR<OrderStatusLogCreateInput, OrderStatusLogUncheckedCreateInput>
  }

  /**
   * OrderStatusLog createMany
   */
  export type OrderStatusLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderStatusLogs.
     */
    data: OrderStatusLogCreateManyInput | OrderStatusLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderStatusLog createManyAndReturn
   */
  export type OrderStatusLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusLog
     */
    select?: OrderStatusLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusLog
     */
    omit?: OrderStatusLogOmit<ExtArgs> | null
    /**
     * The data used to create many OrderStatusLogs.
     */
    data: OrderStatusLogCreateManyInput | OrderStatusLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderStatusLog update
   */
  export type OrderStatusLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusLog
     */
    select?: OrderStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusLog
     */
    omit?: OrderStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusLogInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderStatusLog.
     */
    data: XOR<OrderStatusLogUpdateInput, OrderStatusLogUncheckedUpdateInput>
    /**
     * Choose, which OrderStatusLog to update.
     */
    where: OrderStatusLogWhereUniqueInput
  }

  /**
   * OrderStatusLog updateMany
   */
  export type OrderStatusLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderStatusLogs.
     */
    data: XOR<OrderStatusLogUpdateManyMutationInput, OrderStatusLogUncheckedUpdateManyInput>
    /**
     * Filter which OrderStatusLogs to update
     */
    where?: OrderStatusLogWhereInput
    /**
     * Limit how many OrderStatusLogs to update.
     */
    limit?: number
  }

  /**
   * OrderStatusLog updateManyAndReturn
   */
  export type OrderStatusLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusLog
     */
    select?: OrderStatusLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusLog
     */
    omit?: OrderStatusLogOmit<ExtArgs> | null
    /**
     * The data used to update OrderStatusLogs.
     */
    data: XOR<OrderStatusLogUpdateManyMutationInput, OrderStatusLogUncheckedUpdateManyInput>
    /**
     * Filter which OrderStatusLogs to update
     */
    where?: OrderStatusLogWhereInput
    /**
     * Limit how many OrderStatusLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderStatusLog upsert
   */
  export type OrderStatusLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusLog
     */
    select?: OrderStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusLog
     */
    omit?: OrderStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusLogInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderStatusLog to update in case it exists.
     */
    where: OrderStatusLogWhereUniqueInput
    /**
     * In case the OrderStatusLog found by the `where` argument doesn't exist, create a new OrderStatusLog with this data.
     */
    create: XOR<OrderStatusLogCreateInput, OrderStatusLogUncheckedCreateInput>
    /**
     * In case the OrderStatusLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderStatusLogUpdateInput, OrderStatusLogUncheckedUpdateInput>
  }

  /**
   * OrderStatusLog delete
   */
  export type OrderStatusLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusLog
     */
    select?: OrderStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusLog
     */
    omit?: OrderStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusLogInclude<ExtArgs> | null
    /**
     * Filter which OrderStatusLog to delete.
     */
    where: OrderStatusLogWhereUniqueInput
  }

  /**
   * OrderStatusLog deleteMany
   */
  export type OrderStatusLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderStatusLogs to delete
     */
    where?: OrderStatusLogWhereInput
    /**
     * Limit how many OrderStatusLogs to delete.
     */
    limit?: number
  }

  /**
   * OrderStatusLog without action
   */
  export type OrderStatusLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusLog
     */
    select?: OrderStatusLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusLog
     */
    omit?: OrderStatusLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusLogInclude<ExtArgs> | null
  }


  /**
   * Model Rider
   */

  export type AggregateRider = {
    _count: RiderCountAggregateOutputType | null
    _min: RiderMinAggregateOutputType | null
    _max: RiderMaxAggregateOutputType | null
  }

  export type RiderMinAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    whatsapp: string | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type RiderMaxAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    whatsapp: string | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type RiderCountAggregateOutputType = {
    id: number
    name: number
    phone: number
    whatsapp: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type RiderMinAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    whatsapp?: true
    isActive?: true
    createdAt?: true
  }

  export type RiderMaxAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    whatsapp?: true
    isActive?: true
    createdAt?: true
  }

  export type RiderCountAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    whatsapp?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type RiderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rider to aggregate.
     */
    where?: RiderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Riders to fetch.
     */
    orderBy?: RiderOrderByWithRelationInput | RiderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RiderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Riders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Riders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Riders
    **/
    _count?: true | RiderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RiderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RiderMaxAggregateInputType
  }

  export type GetRiderAggregateType<T extends RiderAggregateArgs> = {
        [P in keyof T & keyof AggregateRider]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRider[P]>
      : GetScalarType<T[P], AggregateRider[P]>
  }




  export type RiderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RiderWhereInput
    orderBy?: RiderOrderByWithAggregationInput | RiderOrderByWithAggregationInput[]
    by: RiderScalarFieldEnum[] | RiderScalarFieldEnum
    having?: RiderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RiderCountAggregateInputType | true
    _min?: RiderMinAggregateInputType
    _max?: RiderMaxAggregateInputType
  }

  export type RiderGroupByOutputType = {
    id: string
    name: string
    phone: string
    whatsapp: string
    isActive: boolean
    createdAt: Date
    _count: RiderCountAggregateOutputType | null
    _min: RiderMinAggregateOutputType | null
    _max: RiderMaxAggregateOutputType | null
  }

  type GetRiderGroupByPayload<T extends RiderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RiderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RiderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RiderGroupByOutputType[P]>
            : GetScalarType<T[P], RiderGroupByOutputType[P]>
        }
      >
    >


  export type RiderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    whatsapp?: boolean
    isActive?: boolean
    createdAt?: boolean
    orders?: boolean | Rider$ordersArgs<ExtArgs>
    _count?: boolean | RiderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rider"]>

  export type RiderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    whatsapp?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["rider"]>

  export type RiderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    whatsapp?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["rider"]>

  export type RiderSelectScalar = {
    id?: boolean
    name?: boolean
    phone?: boolean
    whatsapp?: boolean
    isActive?: boolean
    createdAt?: boolean
  }

  export type RiderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "phone" | "whatsapp" | "isActive" | "createdAt", ExtArgs["result"]["rider"]>
  export type RiderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | Rider$ordersArgs<ExtArgs>
    _count?: boolean | RiderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RiderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RiderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RiderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Rider"
    objects: {
      orders: Prisma.$OrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      phone: string
      whatsapp: string
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["rider"]>
    composites: {}
  }

  type RiderGetPayload<S extends boolean | null | undefined | RiderDefaultArgs> = $Result.GetResult<Prisma.$RiderPayload, S>

  type RiderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RiderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RiderCountAggregateInputType | true
    }

  export interface RiderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Rider'], meta: { name: 'Rider' } }
    /**
     * Find zero or one Rider that matches the filter.
     * @param {RiderFindUniqueArgs} args - Arguments to find a Rider
     * @example
     * // Get one Rider
     * const rider = await prisma.rider.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RiderFindUniqueArgs>(args: SelectSubset<T, RiderFindUniqueArgs<ExtArgs>>): Prisma__RiderClient<$Result.GetResult<Prisma.$RiderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Rider that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RiderFindUniqueOrThrowArgs} args - Arguments to find a Rider
     * @example
     * // Get one Rider
     * const rider = await prisma.rider.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RiderFindUniqueOrThrowArgs>(args: SelectSubset<T, RiderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RiderClient<$Result.GetResult<Prisma.$RiderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rider that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiderFindFirstArgs} args - Arguments to find a Rider
     * @example
     * // Get one Rider
     * const rider = await prisma.rider.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RiderFindFirstArgs>(args?: SelectSubset<T, RiderFindFirstArgs<ExtArgs>>): Prisma__RiderClient<$Result.GetResult<Prisma.$RiderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rider that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiderFindFirstOrThrowArgs} args - Arguments to find a Rider
     * @example
     * // Get one Rider
     * const rider = await prisma.rider.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RiderFindFirstOrThrowArgs>(args?: SelectSubset<T, RiderFindFirstOrThrowArgs<ExtArgs>>): Prisma__RiderClient<$Result.GetResult<Prisma.$RiderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Riders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Riders
     * const riders = await prisma.rider.findMany()
     * 
     * // Get first 10 Riders
     * const riders = await prisma.rider.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const riderWithIdOnly = await prisma.rider.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RiderFindManyArgs>(args?: SelectSubset<T, RiderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Rider.
     * @param {RiderCreateArgs} args - Arguments to create a Rider.
     * @example
     * // Create one Rider
     * const Rider = await prisma.rider.create({
     *   data: {
     *     // ... data to create a Rider
     *   }
     * })
     * 
     */
    create<T extends RiderCreateArgs>(args: SelectSubset<T, RiderCreateArgs<ExtArgs>>): Prisma__RiderClient<$Result.GetResult<Prisma.$RiderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Riders.
     * @param {RiderCreateManyArgs} args - Arguments to create many Riders.
     * @example
     * // Create many Riders
     * const rider = await prisma.rider.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RiderCreateManyArgs>(args?: SelectSubset<T, RiderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Riders and returns the data saved in the database.
     * @param {RiderCreateManyAndReturnArgs} args - Arguments to create many Riders.
     * @example
     * // Create many Riders
     * const rider = await prisma.rider.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Riders and only return the `id`
     * const riderWithIdOnly = await prisma.rider.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RiderCreateManyAndReturnArgs>(args?: SelectSubset<T, RiderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Rider.
     * @param {RiderDeleteArgs} args - Arguments to delete one Rider.
     * @example
     * // Delete one Rider
     * const Rider = await prisma.rider.delete({
     *   where: {
     *     // ... filter to delete one Rider
     *   }
     * })
     * 
     */
    delete<T extends RiderDeleteArgs>(args: SelectSubset<T, RiderDeleteArgs<ExtArgs>>): Prisma__RiderClient<$Result.GetResult<Prisma.$RiderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Rider.
     * @param {RiderUpdateArgs} args - Arguments to update one Rider.
     * @example
     * // Update one Rider
     * const rider = await prisma.rider.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RiderUpdateArgs>(args: SelectSubset<T, RiderUpdateArgs<ExtArgs>>): Prisma__RiderClient<$Result.GetResult<Prisma.$RiderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Riders.
     * @param {RiderDeleteManyArgs} args - Arguments to filter Riders to delete.
     * @example
     * // Delete a few Riders
     * const { count } = await prisma.rider.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RiderDeleteManyArgs>(args?: SelectSubset<T, RiderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Riders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Riders
     * const rider = await prisma.rider.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RiderUpdateManyArgs>(args: SelectSubset<T, RiderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Riders and returns the data updated in the database.
     * @param {RiderUpdateManyAndReturnArgs} args - Arguments to update many Riders.
     * @example
     * // Update many Riders
     * const rider = await prisma.rider.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Riders and only return the `id`
     * const riderWithIdOnly = await prisma.rider.updateManyAndReturn({
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
    updateManyAndReturn<T extends RiderUpdateManyAndReturnArgs>(args: SelectSubset<T, RiderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Rider.
     * @param {RiderUpsertArgs} args - Arguments to update or create a Rider.
     * @example
     * // Update or create a Rider
     * const rider = await prisma.rider.upsert({
     *   create: {
     *     // ... data to create a Rider
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Rider we want to update
     *   }
     * })
     */
    upsert<T extends RiderUpsertArgs>(args: SelectSubset<T, RiderUpsertArgs<ExtArgs>>): Prisma__RiderClient<$Result.GetResult<Prisma.$RiderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Riders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiderCountArgs} args - Arguments to filter Riders to count.
     * @example
     * // Count the number of Riders
     * const count = await prisma.rider.count({
     *   where: {
     *     // ... the filter for the Riders we want to count
     *   }
     * })
    **/
    count<T extends RiderCountArgs>(
      args?: Subset<T, RiderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RiderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Rider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RiderAggregateArgs>(args: Subset<T, RiderAggregateArgs>): Prisma.PrismaPromise<GetRiderAggregateType<T>>

    /**
     * Group by Rider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiderGroupByArgs} args - Group by arguments.
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
      T extends RiderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RiderGroupByArgs['orderBy'] }
        : { orderBy?: RiderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RiderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRiderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Rider model
   */
  readonly fields: RiderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Rider.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RiderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    orders<T extends Rider$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Rider$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Rider model
   */
  interface RiderFieldRefs {
    readonly id: FieldRef<"Rider", 'String'>
    readonly name: FieldRef<"Rider", 'String'>
    readonly phone: FieldRef<"Rider", 'String'>
    readonly whatsapp: FieldRef<"Rider", 'String'>
    readonly isActive: FieldRef<"Rider", 'Boolean'>
    readonly createdAt: FieldRef<"Rider", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Rider findUnique
   */
  export type RiderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rider
     */
    select?: RiderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rider
     */
    omit?: RiderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiderInclude<ExtArgs> | null
    /**
     * Filter, which Rider to fetch.
     */
    where: RiderWhereUniqueInput
  }

  /**
   * Rider findUniqueOrThrow
   */
  export type RiderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rider
     */
    select?: RiderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rider
     */
    omit?: RiderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiderInclude<ExtArgs> | null
    /**
     * Filter, which Rider to fetch.
     */
    where: RiderWhereUniqueInput
  }

  /**
   * Rider findFirst
   */
  export type RiderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rider
     */
    select?: RiderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rider
     */
    omit?: RiderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiderInclude<ExtArgs> | null
    /**
     * Filter, which Rider to fetch.
     */
    where?: RiderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Riders to fetch.
     */
    orderBy?: RiderOrderByWithRelationInput | RiderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Riders.
     */
    cursor?: RiderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Riders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Riders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Riders.
     */
    distinct?: RiderScalarFieldEnum | RiderScalarFieldEnum[]
  }

  /**
   * Rider findFirstOrThrow
   */
  export type RiderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rider
     */
    select?: RiderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rider
     */
    omit?: RiderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiderInclude<ExtArgs> | null
    /**
     * Filter, which Rider to fetch.
     */
    where?: RiderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Riders to fetch.
     */
    orderBy?: RiderOrderByWithRelationInput | RiderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Riders.
     */
    cursor?: RiderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Riders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Riders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Riders.
     */
    distinct?: RiderScalarFieldEnum | RiderScalarFieldEnum[]
  }

  /**
   * Rider findMany
   */
  export type RiderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rider
     */
    select?: RiderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rider
     */
    omit?: RiderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiderInclude<ExtArgs> | null
    /**
     * Filter, which Riders to fetch.
     */
    where?: RiderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Riders to fetch.
     */
    orderBy?: RiderOrderByWithRelationInput | RiderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Riders.
     */
    cursor?: RiderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Riders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Riders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Riders.
     */
    distinct?: RiderScalarFieldEnum | RiderScalarFieldEnum[]
  }

  /**
   * Rider create
   */
  export type RiderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rider
     */
    select?: RiderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rider
     */
    omit?: RiderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiderInclude<ExtArgs> | null
    /**
     * The data needed to create a Rider.
     */
    data: XOR<RiderCreateInput, RiderUncheckedCreateInput>
  }

  /**
   * Rider createMany
   */
  export type RiderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Riders.
     */
    data: RiderCreateManyInput | RiderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Rider createManyAndReturn
   */
  export type RiderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rider
     */
    select?: RiderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Rider
     */
    omit?: RiderOmit<ExtArgs> | null
    /**
     * The data used to create many Riders.
     */
    data: RiderCreateManyInput | RiderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Rider update
   */
  export type RiderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rider
     */
    select?: RiderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rider
     */
    omit?: RiderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiderInclude<ExtArgs> | null
    /**
     * The data needed to update a Rider.
     */
    data: XOR<RiderUpdateInput, RiderUncheckedUpdateInput>
    /**
     * Choose, which Rider to update.
     */
    where: RiderWhereUniqueInput
  }

  /**
   * Rider updateMany
   */
  export type RiderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Riders.
     */
    data: XOR<RiderUpdateManyMutationInput, RiderUncheckedUpdateManyInput>
    /**
     * Filter which Riders to update
     */
    where?: RiderWhereInput
    /**
     * Limit how many Riders to update.
     */
    limit?: number
  }

  /**
   * Rider updateManyAndReturn
   */
  export type RiderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rider
     */
    select?: RiderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Rider
     */
    omit?: RiderOmit<ExtArgs> | null
    /**
     * The data used to update Riders.
     */
    data: XOR<RiderUpdateManyMutationInput, RiderUncheckedUpdateManyInput>
    /**
     * Filter which Riders to update
     */
    where?: RiderWhereInput
    /**
     * Limit how many Riders to update.
     */
    limit?: number
  }

  /**
   * Rider upsert
   */
  export type RiderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rider
     */
    select?: RiderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rider
     */
    omit?: RiderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiderInclude<ExtArgs> | null
    /**
     * The filter to search for the Rider to update in case it exists.
     */
    where: RiderWhereUniqueInput
    /**
     * In case the Rider found by the `where` argument doesn't exist, create a new Rider with this data.
     */
    create: XOR<RiderCreateInput, RiderUncheckedCreateInput>
    /**
     * In case the Rider was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RiderUpdateInput, RiderUncheckedUpdateInput>
  }

  /**
   * Rider delete
   */
  export type RiderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rider
     */
    select?: RiderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rider
     */
    omit?: RiderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiderInclude<ExtArgs> | null
    /**
     * Filter which Rider to delete.
     */
    where: RiderWhereUniqueInput
  }

  /**
   * Rider deleteMany
   */
  export type RiderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Riders to delete
     */
    where?: RiderWhereInput
    /**
     * Limit how many Riders to delete.
     */
    limit?: number
  }

  /**
   * Rider.orders
   */
  export type Rider$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Rider without action
   */
  export type RiderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rider
     */
    select?: RiderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rider
     */
    omit?: RiderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiderInclude<ExtArgs> | null
  }


  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  export type OrderItemAvgAggregateOutputType = {
    unitPrice: Decimal | null
    quantity: number | null
    lineTotal: Decimal | null
  }

  export type OrderItemSumAggregateOutputType = {
    unitPrice: Decimal | null
    quantity: number | null
    lineTotal: Decimal | null
  }

  export type OrderItemMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    productId: string | null
    name: string | null
    unitPrice: Decimal | null
    quantity: number | null
    lineTotal: Decimal | null
    imageUrl: string | null
    category: string | null
  }

  export type OrderItemMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    productId: string | null
    name: string | null
    unitPrice: Decimal | null
    quantity: number | null
    lineTotal: Decimal | null
    imageUrl: string | null
    category: string | null
  }

  export type OrderItemCountAggregateOutputType = {
    id: number
    orderId: number
    productId: number
    name: number
    unitPrice: number
    quantity: number
    lineTotal: number
    imageUrl: number
    category: number
    _all: number
  }


  export type OrderItemAvgAggregateInputType = {
    unitPrice?: true
    quantity?: true
    lineTotal?: true
  }

  export type OrderItemSumAggregateInputType = {
    unitPrice?: true
    quantity?: true
    lineTotal?: true
  }

  export type OrderItemMinAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    name?: true
    unitPrice?: true
    quantity?: true
    lineTotal?: true
    imageUrl?: true
    category?: true
  }

  export type OrderItemMaxAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    name?: true
    unitPrice?: true
    quantity?: true
    lineTotal?: true
    imageUrl?: true
    category?: true
  }

  export type OrderItemCountAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    name?: true
    unitPrice?: true
    quantity?: true
    lineTotal?: true
    imageUrl?: true
    category?: true
    _all?: true
  }

  export type OrderItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderItems
    **/
    _count?: true | OrderItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderItemMaxAggregateInputType
  }

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>
  }




  export type OrderItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithAggregationInput | OrderItemOrderByWithAggregationInput[]
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum
    having?: OrderItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderItemCountAggregateInputType | true
    _avg?: OrderItemAvgAggregateInputType
    _sum?: OrderItemSumAggregateInputType
    _min?: OrderItemMinAggregateInputType
    _max?: OrderItemMaxAggregateInputType
  }

  export type OrderItemGroupByOutputType = {
    id: string
    orderId: string
    productId: string
    name: string
    unitPrice: Decimal
    quantity: number
    lineTotal: Decimal
    imageUrl: string | null
    category: string | null
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
        }
      >
    >


  export type OrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    name?: boolean
    unitPrice?: boolean
    quantity?: boolean
    lineTotal?: boolean
    imageUrl?: boolean
    category?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    name?: boolean
    unitPrice?: boolean
    quantity?: boolean
    lineTotal?: boolean
    imageUrl?: boolean
    category?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    name?: boolean
    unitPrice?: boolean
    quantity?: boolean
    lineTotal?: boolean
    imageUrl?: boolean
    category?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectScalar = {
    id?: boolean
    orderId?: boolean
    productId?: boolean
    name?: boolean
    unitPrice?: boolean
    quantity?: boolean
    lineTotal?: boolean
    imageUrl?: boolean
    category?: boolean
  }

  export type OrderItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "productId" | "name" | "unitPrice" | "quantity" | "lineTotal" | "imageUrl" | "category", ExtArgs["result"]["orderItem"]>
  export type OrderItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $OrderItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderItem"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      productId: string
      name: string
      unitPrice: Prisma.Decimal
      quantity: number
      lineTotal: Prisma.Decimal
      imageUrl: string | null
      category: string | null
    }, ExtArgs["result"]["orderItem"]>
    composites: {}
  }

  type OrderItemGetPayload<S extends boolean | null | undefined | OrderItemDefaultArgs> = $Result.GetResult<Prisma.$OrderItemPayload, S>

  type OrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderItemCountAggregateInputType | true
    }

  export interface OrderItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'], meta: { name: 'OrderItem' } }
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     * 
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderItemFindManyArgs>(args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     * 
     */
    create<T extends OrderItemCreateArgs>(args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderItemCreateManyArgs>(args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderItems and returns the data saved in the database.
     * @param {OrderItemCreateManyAndReturnArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderItemCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     * 
     */
    delete<T extends OrderItemDeleteArgs>(args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderItemUpdateArgs>(args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderItemUpdateManyArgs>(args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems and returns the data updated in the database.
     * @param {OrderItemUpdateManyAndReturnArgs} args - Arguments to update many OrderItems.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.updateManyAndReturn({
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
    updateManyAndReturn<T extends OrderItemUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
    **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderItemAggregateArgs>(args: Subset<T, OrderItemAggregateArgs>): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
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
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderItem model
   */
  readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the OrderItem model
   */
  interface OrderItemFieldRefs {
    readonly id: FieldRef<"OrderItem", 'String'>
    readonly orderId: FieldRef<"OrderItem", 'String'>
    readonly productId: FieldRef<"OrderItem", 'String'>
    readonly name: FieldRef<"OrderItem", 'String'>
    readonly unitPrice: FieldRef<"OrderItem", 'Decimal'>
    readonly quantity: FieldRef<"OrderItem", 'Int'>
    readonly lineTotal: FieldRef<"OrderItem", 'Decimal'>
    readonly imageUrl: FieldRef<"OrderItem", 'String'>
    readonly category: FieldRef<"OrderItem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
  }

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderItem createManyAndReturn
   */
  export type OrderItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
  }

  /**
   * OrderItem updateManyAndReturn
   */
  export type OrderItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
  }

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to delete.
     */
    limit?: number
  }

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
  }


  /**
   * Model PaymentTransaction
   */

  export type AggregatePaymentTransaction = {
    _count: PaymentTransactionCountAggregateOutputType | null
    _avg: PaymentTransactionAvgAggregateOutputType | null
    _sum: PaymentTransactionSumAggregateOutputType | null
    _min: PaymentTransactionMinAggregateOutputType | null
    _max: PaymentTransactionMaxAggregateOutputType | null
  }

  export type PaymentTransactionAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type PaymentTransactionSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type PaymentTransactionMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    reference: string | null
    provider: string | null
    providerReference: string | null
    authorizationUrl: string | null
    accessCode: string | null
    status: string | null
    amount: Decimal | null
    currency: string | null
    paidAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentTransactionMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    reference: string | null
    provider: string | null
    providerReference: string | null
    authorizationUrl: string | null
    accessCode: string | null
    status: string | null
    amount: Decimal | null
    currency: string | null
    paidAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentTransactionCountAggregateOutputType = {
    id: number
    orderId: number
    reference: number
    provider: number
    providerReference: number
    authorizationUrl: number
    accessCode: number
    status: number
    amount: number
    currency: number
    paidAt: number
    rawPayload: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentTransactionAvgAggregateInputType = {
    amount?: true
  }

  export type PaymentTransactionSumAggregateInputType = {
    amount?: true
  }

  export type PaymentTransactionMinAggregateInputType = {
    id?: true
    orderId?: true
    reference?: true
    provider?: true
    providerReference?: true
    authorizationUrl?: true
    accessCode?: true
    status?: true
    amount?: true
    currency?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentTransactionMaxAggregateInputType = {
    id?: true
    orderId?: true
    reference?: true
    provider?: true
    providerReference?: true
    authorizationUrl?: true
    accessCode?: true
    status?: true
    amount?: true
    currency?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentTransactionCountAggregateInputType = {
    id?: true
    orderId?: true
    reference?: true
    provider?: true
    providerReference?: true
    authorizationUrl?: true
    accessCode?: true
    status?: true
    amount?: true
    currency?: true
    paidAt?: true
    rawPayload?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentTransaction to aggregate.
     */
    where?: PaymentTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentTransactions to fetch.
     */
    orderBy?: PaymentTransactionOrderByWithRelationInput | PaymentTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PaymentTransactions
    **/
    _count?: true | PaymentTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentTransactionMaxAggregateInputType
  }

  export type GetPaymentTransactionAggregateType<T extends PaymentTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregatePaymentTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaymentTransaction[P]>
      : GetScalarType<T[P], AggregatePaymentTransaction[P]>
  }




  export type PaymentTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentTransactionWhereInput
    orderBy?: PaymentTransactionOrderByWithAggregationInput | PaymentTransactionOrderByWithAggregationInput[]
    by: PaymentTransactionScalarFieldEnum[] | PaymentTransactionScalarFieldEnum
    having?: PaymentTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentTransactionCountAggregateInputType | true
    _avg?: PaymentTransactionAvgAggregateInputType
    _sum?: PaymentTransactionSumAggregateInputType
    _min?: PaymentTransactionMinAggregateInputType
    _max?: PaymentTransactionMaxAggregateInputType
  }

  export type PaymentTransactionGroupByOutputType = {
    id: string
    orderId: string
    reference: string
    provider: string
    providerReference: string | null
    authorizationUrl: string | null
    accessCode: string | null
    status: string
    amount: Decimal
    currency: string
    paidAt: Date | null
    rawPayload: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: PaymentTransactionCountAggregateOutputType | null
    _avg: PaymentTransactionAvgAggregateOutputType | null
    _sum: PaymentTransactionSumAggregateOutputType | null
    _min: PaymentTransactionMinAggregateOutputType | null
    _max: PaymentTransactionMaxAggregateOutputType | null
  }

  type GetPaymentTransactionGroupByPayload<T extends PaymentTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentTransactionGroupByOutputType[P]>
        }
      >
    >


  export type PaymentTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    reference?: boolean
    provider?: boolean
    providerReference?: boolean
    authorizationUrl?: boolean
    accessCode?: boolean
    status?: boolean
    amount?: boolean
    currency?: boolean
    paidAt?: boolean
    rawPayload?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentTransaction"]>

  export type PaymentTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    reference?: boolean
    provider?: boolean
    providerReference?: boolean
    authorizationUrl?: boolean
    accessCode?: boolean
    status?: boolean
    amount?: boolean
    currency?: boolean
    paidAt?: boolean
    rawPayload?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentTransaction"]>

  export type PaymentTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    reference?: boolean
    provider?: boolean
    providerReference?: boolean
    authorizationUrl?: boolean
    accessCode?: boolean
    status?: boolean
    amount?: boolean
    currency?: boolean
    paidAt?: boolean
    rawPayload?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentTransaction"]>

  export type PaymentTransactionSelectScalar = {
    id?: boolean
    orderId?: boolean
    reference?: boolean
    provider?: boolean
    providerReference?: boolean
    authorizationUrl?: boolean
    accessCode?: boolean
    status?: boolean
    amount?: boolean
    currency?: boolean
    paidAt?: boolean
    rawPayload?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "reference" | "provider" | "providerReference" | "authorizationUrl" | "accessCode" | "status" | "amount" | "currency" | "paidAt" | "rawPayload" | "createdAt" | "updatedAt", ExtArgs["result"]["paymentTransaction"]>
  export type PaymentTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type PaymentTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type PaymentTransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $PaymentTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PaymentTransaction"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      reference: string
      provider: string
      providerReference: string | null
      authorizationUrl: string | null
      accessCode: string | null
      status: string
      amount: Prisma.Decimal
      currency: string
      paidAt: Date | null
      rawPayload: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["paymentTransaction"]>
    composites: {}
  }

  type PaymentTransactionGetPayload<S extends boolean | null | undefined | PaymentTransactionDefaultArgs> = $Result.GetResult<Prisma.$PaymentTransactionPayload, S>

  type PaymentTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentTransactionCountAggregateInputType | true
    }

  export interface PaymentTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PaymentTransaction'], meta: { name: 'PaymentTransaction' } }
    /**
     * Find zero or one PaymentTransaction that matches the filter.
     * @param {PaymentTransactionFindUniqueArgs} args - Arguments to find a PaymentTransaction
     * @example
     * // Get one PaymentTransaction
     * const paymentTransaction = await prisma.paymentTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentTransactionFindUniqueArgs>(args: SelectSubset<T, PaymentTransactionFindUniqueArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PaymentTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentTransactionFindUniqueOrThrowArgs} args - Arguments to find a PaymentTransaction
     * @example
     * // Get one PaymentTransaction
     * const paymentTransaction = await prisma.paymentTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentTransactionFindFirstArgs} args - Arguments to find a PaymentTransaction
     * @example
     * // Get one PaymentTransaction
     * const paymentTransaction = await prisma.paymentTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentTransactionFindFirstArgs>(args?: SelectSubset<T, PaymentTransactionFindFirstArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentTransactionFindFirstOrThrowArgs} args - Arguments to find a PaymentTransaction
     * @example
     * // Get one PaymentTransaction
     * const paymentTransaction = await prisma.paymentTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PaymentTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PaymentTransactions
     * const paymentTransactions = await prisma.paymentTransaction.findMany()
     * 
     * // Get first 10 PaymentTransactions
     * const paymentTransactions = await prisma.paymentTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentTransactionWithIdOnly = await prisma.paymentTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentTransactionFindManyArgs>(args?: SelectSubset<T, PaymentTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PaymentTransaction.
     * @param {PaymentTransactionCreateArgs} args - Arguments to create a PaymentTransaction.
     * @example
     * // Create one PaymentTransaction
     * const PaymentTransaction = await prisma.paymentTransaction.create({
     *   data: {
     *     // ... data to create a PaymentTransaction
     *   }
     * })
     * 
     */
    create<T extends PaymentTransactionCreateArgs>(args: SelectSubset<T, PaymentTransactionCreateArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PaymentTransactions.
     * @param {PaymentTransactionCreateManyArgs} args - Arguments to create many PaymentTransactions.
     * @example
     * // Create many PaymentTransactions
     * const paymentTransaction = await prisma.paymentTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentTransactionCreateManyArgs>(args?: SelectSubset<T, PaymentTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PaymentTransactions and returns the data saved in the database.
     * @param {PaymentTransactionCreateManyAndReturnArgs} args - Arguments to create many PaymentTransactions.
     * @example
     * // Create many PaymentTransactions
     * const paymentTransaction = await prisma.paymentTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PaymentTransactions and only return the `id`
     * const paymentTransactionWithIdOnly = await prisma.paymentTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PaymentTransaction.
     * @param {PaymentTransactionDeleteArgs} args - Arguments to delete one PaymentTransaction.
     * @example
     * // Delete one PaymentTransaction
     * const PaymentTransaction = await prisma.paymentTransaction.delete({
     *   where: {
     *     // ... filter to delete one PaymentTransaction
     *   }
     * })
     * 
     */
    delete<T extends PaymentTransactionDeleteArgs>(args: SelectSubset<T, PaymentTransactionDeleteArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PaymentTransaction.
     * @param {PaymentTransactionUpdateArgs} args - Arguments to update one PaymentTransaction.
     * @example
     * // Update one PaymentTransaction
     * const paymentTransaction = await prisma.paymentTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentTransactionUpdateArgs>(args: SelectSubset<T, PaymentTransactionUpdateArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PaymentTransactions.
     * @param {PaymentTransactionDeleteManyArgs} args - Arguments to filter PaymentTransactions to delete.
     * @example
     * // Delete a few PaymentTransactions
     * const { count } = await prisma.paymentTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentTransactionDeleteManyArgs>(args?: SelectSubset<T, PaymentTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PaymentTransactions
     * const paymentTransaction = await prisma.paymentTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentTransactionUpdateManyArgs>(args: SelectSubset<T, PaymentTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentTransactions and returns the data updated in the database.
     * @param {PaymentTransactionUpdateManyAndReturnArgs} args - Arguments to update many PaymentTransactions.
     * @example
     * // Update many PaymentTransactions
     * const paymentTransaction = await prisma.paymentTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PaymentTransactions and only return the `id`
     * const paymentTransactionWithIdOnly = await prisma.paymentTransaction.updateManyAndReturn({
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
    updateManyAndReturn<T extends PaymentTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PaymentTransaction.
     * @param {PaymentTransactionUpsertArgs} args - Arguments to update or create a PaymentTransaction.
     * @example
     * // Update or create a PaymentTransaction
     * const paymentTransaction = await prisma.paymentTransaction.upsert({
     *   create: {
     *     // ... data to create a PaymentTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PaymentTransaction we want to update
     *   }
     * })
     */
    upsert<T extends PaymentTransactionUpsertArgs>(args: SelectSubset<T, PaymentTransactionUpsertArgs<ExtArgs>>): Prisma__PaymentTransactionClient<$Result.GetResult<Prisma.$PaymentTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PaymentTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentTransactionCountArgs} args - Arguments to filter PaymentTransactions to count.
     * @example
     * // Count the number of PaymentTransactions
     * const count = await prisma.paymentTransaction.count({
     *   where: {
     *     // ... the filter for the PaymentTransactions we want to count
     *   }
     * })
    **/
    count<T extends PaymentTransactionCountArgs>(
      args?: Subset<T, PaymentTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PaymentTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PaymentTransactionAggregateArgs>(args: Subset<T, PaymentTransactionAggregateArgs>): Prisma.PrismaPromise<GetPaymentTransactionAggregateType<T>>

    /**
     * Group by PaymentTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentTransactionGroupByArgs} args - Group by arguments.
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
      T extends PaymentTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentTransactionGroupByArgs['orderBy'] }
        : { orderBy?: PaymentTransactionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PaymentTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PaymentTransaction model
   */
  readonly fields: PaymentTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PaymentTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PaymentTransaction model
   */
  interface PaymentTransactionFieldRefs {
    readonly id: FieldRef<"PaymentTransaction", 'String'>
    readonly orderId: FieldRef<"PaymentTransaction", 'String'>
    readonly reference: FieldRef<"PaymentTransaction", 'String'>
    readonly provider: FieldRef<"PaymentTransaction", 'String'>
    readonly providerReference: FieldRef<"PaymentTransaction", 'String'>
    readonly authorizationUrl: FieldRef<"PaymentTransaction", 'String'>
    readonly accessCode: FieldRef<"PaymentTransaction", 'String'>
    readonly status: FieldRef<"PaymentTransaction", 'String'>
    readonly amount: FieldRef<"PaymentTransaction", 'Decimal'>
    readonly currency: FieldRef<"PaymentTransaction", 'String'>
    readonly paidAt: FieldRef<"PaymentTransaction", 'DateTime'>
    readonly rawPayload: FieldRef<"PaymentTransaction", 'Json'>
    readonly createdAt: FieldRef<"PaymentTransaction", 'DateTime'>
    readonly updatedAt: FieldRef<"PaymentTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PaymentTransaction findUnique
   */
  export type PaymentTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentTransaction to fetch.
     */
    where: PaymentTransactionWhereUniqueInput
  }

  /**
   * PaymentTransaction findUniqueOrThrow
   */
  export type PaymentTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentTransaction to fetch.
     */
    where: PaymentTransactionWhereUniqueInput
  }

  /**
   * PaymentTransaction findFirst
   */
  export type PaymentTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentTransaction to fetch.
     */
    where?: PaymentTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentTransactions to fetch.
     */
    orderBy?: PaymentTransactionOrderByWithRelationInput | PaymentTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentTransactions.
     */
    cursor?: PaymentTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentTransactions.
     */
    distinct?: PaymentTransactionScalarFieldEnum | PaymentTransactionScalarFieldEnum[]
  }

  /**
   * PaymentTransaction findFirstOrThrow
   */
  export type PaymentTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentTransaction to fetch.
     */
    where?: PaymentTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentTransactions to fetch.
     */
    orderBy?: PaymentTransactionOrderByWithRelationInput | PaymentTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentTransactions.
     */
    cursor?: PaymentTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentTransactions.
     */
    distinct?: PaymentTransactionScalarFieldEnum | PaymentTransactionScalarFieldEnum[]
  }

  /**
   * PaymentTransaction findMany
   */
  export type PaymentTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PaymentTransactions to fetch.
     */
    where?: PaymentTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentTransactions to fetch.
     */
    orderBy?: PaymentTransactionOrderByWithRelationInput | PaymentTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PaymentTransactions.
     */
    cursor?: PaymentTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentTransactions.
     */
    distinct?: PaymentTransactionScalarFieldEnum | PaymentTransactionScalarFieldEnum[]
  }

  /**
   * PaymentTransaction create
   */
  export type PaymentTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a PaymentTransaction.
     */
    data: XOR<PaymentTransactionCreateInput, PaymentTransactionUncheckedCreateInput>
  }

  /**
   * PaymentTransaction createMany
   */
  export type PaymentTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PaymentTransactions.
     */
    data: PaymentTransactionCreateManyInput | PaymentTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PaymentTransaction createManyAndReturn
   */
  export type PaymentTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many PaymentTransactions.
     */
    data: PaymentTransactionCreateManyInput | PaymentTransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentTransaction update
   */
  export type PaymentTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a PaymentTransaction.
     */
    data: XOR<PaymentTransactionUpdateInput, PaymentTransactionUncheckedUpdateInput>
    /**
     * Choose, which PaymentTransaction to update.
     */
    where: PaymentTransactionWhereUniqueInput
  }

  /**
   * PaymentTransaction updateMany
   */
  export type PaymentTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PaymentTransactions.
     */
    data: XOR<PaymentTransactionUpdateManyMutationInput, PaymentTransactionUncheckedUpdateManyInput>
    /**
     * Filter which PaymentTransactions to update
     */
    where?: PaymentTransactionWhereInput
    /**
     * Limit how many PaymentTransactions to update.
     */
    limit?: number
  }

  /**
   * PaymentTransaction updateManyAndReturn
   */
  export type PaymentTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * The data used to update PaymentTransactions.
     */
    data: XOR<PaymentTransactionUpdateManyMutationInput, PaymentTransactionUncheckedUpdateManyInput>
    /**
     * Filter which PaymentTransactions to update
     */
    where?: PaymentTransactionWhereInput
    /**
     * Limit how many PaymentTransactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentTransaction upsert
   */
  export type PaymentTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the PaymentTransaction to update in case it exists.
     */
    where: PaymentTransactionWhereUniqueInput
    /**
     * In case the PaymentTransaction found by the `where` argument doesn't exist, create a new PaymentTransaction with this data.
     */
    create: XOR<PaymentTransactionCreateInput, PaymentTransactionUncheckedCreateInput>
    /**
     * In case the PaymentTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentTransactionUpdateInput, PaymentTransactionUncheckedUpdateInput>
  }

  /**
   * PaymentTransaction delete
   */
  export type PaymentTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
    /**
     * Filter which PaymentTransaction to delete.
     */
    where: PaymentTransactionWhereUniqueInput
  }

  /**
   * PaymentTransaction deleteMany
   */
  export type PaymentTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentTransactions to delete
     */
    where?: PaymentTransactionWhereInput
    /**
     * Limit how many PaymentTransactions to delete.
     */
    limit?: number
  }

  /**
   * PaymentTransaction without action
   */
  export type PaymentTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentTransaction
     */
    select?: PaymentTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentTransaction
     */
    omit?: PaymentTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentTransactionInclude<ExtArgs> | null
  }


  /**
   * Model HeroSlide
   */

  export type AggregateHeroSlide = {
    _count: HeroSlideCountAggregateOutputType | null
    _avg: HeroSlideAvgAggregateOutputType | null
    _sum: HeroSlideSumAggregateOutputType | null
    _min: HeroSlideMinAggregateOutputType | null
    _max: HeroSlideMaxAggregateOutputType | null
  }

  export type HeroSlideAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type HeroSlideSumAggregateOutputType = {
    sortOrder: number | null
  }

  export type HeroSlideMinAggregateOutputType = {
    id: string | null
    title: string | null
    subtitle: string | null
    imageUrl: string | null
    ctaText: string | null
    ctaUrl: string | null
    active: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HeroSlideMaxAggregateOutputType = {
    id: string | null
    title: string | null
    subtitle: string | null
    imageUrl: string | null
    ctaText: string | null
    ctaUrl: string | null
    active: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HeroSlideCountAggregateOutputType = {
    id: number
    title: number
    subtitle: number
    imageUrl: number
    ctaText: number
    ctaUrl: number
    active: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HeroSlideAvgAggregateInputType = {
    sortOrder?: true
  }

  export type HeroSlideSumAggregateInputType = {
    sortOrder?: true
  }

  export type HeroSlideMinAggregateInputType = {
    id?: true
    title?: true
    subtitle?: true
    imageUrl?: true
    ctaText?: true
    ctaUrl?: true
    active?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HeroSlideMaxAggregateInputType = {
    id?: true
    title?: true
    subtitle?: true
    imageUrl?: true
    ctaText?: true
    ctaUrl?: true
    active?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HeroSlideCountAggregateInputType = {
    id?: true
    title?: true
    subtitle?: true
    imageUrl?: true
    ctaText?: true
    ctaUrl?: true
    active?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HeroSlideAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HeroSlide to aggregate.
     */
    where?: HeroSlideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HeroSlides to fetch.
     */
    orderBy?: HeroSlideOrderByWithRelationInput | HeroSlideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HeroSlideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HeroSlides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HeroSlides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HeroSlides
    **/
    _count?: true | HeroSlideCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HeroSlideAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HeroSlideSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HeroSlideMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HeroSlideMaxAggregateInputType
  }

  export type GetHeroSlideAggregateType<T extends HeroSlideAggregateArgs> = {
        [P in keyof T & keyof AggregateHeroSlide]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHeroSlide[P]>
      : GetScalarType<T[P], AggregateHeroSlide[P]>
  }




  export type HeroSlideGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HeroSlideWhereInput
    orderBy?: HeroSlideOrderByWithAggregationInput | HeroSlideOrderByWithAggregationInput[]
    by: HeroSlideScalarFieldEnum[] | HeroSlideScalarFieldEnum
    having?: HeroSlideScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HeroSlideCountAggregateInputType | true
    _avg?: HeroSlideAvgAggregateInputType
    _sum?: HeroSlideSumAggregateInputType
    _min?: HeroSlideMinAggregateInputType
    _max?: HeroSlideMaxAggregateInputType
  }

  export type HeroSlideGroupByOutputType = {
    id: string
    title: string
    subtitle: string | null
    imageUrl: string
    ctaText: string | null
    ctaUrl: string | null
    active: boolean
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    _count: HeroSlideCountAggregateOutputType | null
    _avg: HeroSlideAvgAggregateOutputType | null
    _sum: HeroSlideSumAggregateOutputType | null
    _min: HeroSlideMinAggregateOutputType | null
    _max: HeroSlideMaxAggregateOutputType | null
  }

  type GetHeroSlideGroupByPayload<T extends HeroSlideGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HeroSlideGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HeroSlideGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HeroSlideGroupByOutputType[P]>
            : GetScalarType<T[P], HeroSlideGroupByOutputType[P]>
        }
      >
    >


  export type HeroSlideSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    subtitle?: boolean
    imageUrl?: boolean
    ctaText?: boolean
    ctaUrl?: boolean
    active?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["heroSlide"]>

  export type HeroSlideSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    subtitle?: boolean
    imageUrl?: boolean
    ctaText?: boolean
    ctaUrl?: boolean
    active?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["heroSlide"]>

  export type HeroSlideSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    subtitle?: boolean
    imageUrl?: boolean
    ctaText?: boolean
    ctaUrl?: boolean
    active?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["heroSlide"]>

  export type HeroSlideSelectScalar = {
    id?: boolean
    title?: boolean
    subtitle?: boolean
    imageUrl?: boolean
    ctaText?: boolean
    ctaUrl?: boolean
    active?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type HeroSlideOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "subtitle" | "imageUrl" | "ctaText" | "ctaUrl" | "active" | "sortOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["heroSlide"]>

  export type $HeroSlidePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HeroSlide"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      subtitle: string | null
      imageUrl: string
      ctaText: string | null
      ctaUrl: string | null
      active: boolean
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["heroSlide"]>
    composites: {}
  }

  type HeroSlideGetPayload<S extends boolean | null | undefined | HeroSlideDefaultArgs> = $Result.GetResult<Prisma.$HeroSlidePayload, S>

  type HeroSlideCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HeroSlideFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HeroSlideCountAggregateInputType | true
    }

  export interface HeroSlideDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HeroSlide'], meta: { name: 'HeroSlide' } }
    /**
     * Find zero or one HeroSlide that matches the filter.
     * @param {HeroSlideFindUniqueArgs} args - Arguments to find a HeroSlide
     * @example
     * // Get one HeroSlide
     * const heroSlide = await prisma.heroSlide.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HeroSlideFindUniqueArgs>(args: SelectSubset<T, HeroSlideFindUniqueArgs<ExtArgs>>): Prisma__HeroSlideClient<$Result.GetResult<Prisma.$HeroSlidePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HeroSlide that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HeroSlideFindUniqueOrThrowArgs} args - Arguments to find a HeroSlide
     * @example
     * // Get one HeroSlide
     * const heroSlide = await prisma.heroSlide.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HeroSlideFindUniqueOrThrowArgs>(args: SelectSubset<T, HeroSlideFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HeroSlideClient<$Result.GetResult<Prisma.$HeroSlidePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HeroSlide that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeroSlideFindFirstArgs} args - Arguments to find a HeroSlide
     * @example
     * // Get one HeroSlide
     * const heroSlide = await prisma.heroSlide.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HeroSlideFindFirstArgs>(args?: SelectSubset<T, HeroSlideFindFirstArgs<ExtArgs>>): Prisma__HeroSlideClient<$Result.GetResult<Prisma.$HeroSlidePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HeroSlide that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeroSlideFindFirstOrThrowArgs} args - Arguments to find a HeroSlide
     * @example
     * // Get one HeroSlide
     * const heroSlide = await prisma.heroSlide.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HeroSlideFindFirstOrThrowArgs>(args?: SelectSubset<T, HeroSlideFindFirstOrThrowArgs<ExtArgs>>): Prisma__HeroSlideClient<$Result.GetResult<Prisma.$HeroSlidePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HeroSlides that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeroSlideFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HeroSlides
     * const heroSlides = await prisma.heroSlide.findMany()
     * 
     * // Get first 10 HeroSlides
     * const heroSlides = await prisma.heroSlide.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const heroSlideWithIdOnly = await prisma.heroSlide.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HeroSlideFindManyArgs>(args?: SelectSubset<T, HeroSlideFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HeroSlidePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HeroSlide.
     * @param {HeroSlideCreateArgs} args - Arguments to create a HeroSlide.
     * @example
     * // Create one HeroSlide
     * const HeroSlide = await prisma.heroSlide.create({
     *   data: {
     *     // ... data to create a HeroSlide
     *   }
     * })
     * 
     */
    create<T extends HeroSlideCreateArgs>(args: SelectSubset<T, HeroSlideCreateArgs<ExtArgs>>): Prisma__HeroSlideClient<$Result.GetResult<Prisma.$HeroSlidePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HeroSlides.
     * @param {HeroSlideCreateManyArgs} args - Arguments to create many HeroSlides.
     * @example
     * // Create many HeroSlides
     * const heroSlide = await prisma.heroSlide.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HeroSlideCreateManyArgs>(args?: SelectSubset<T, HeroSlideCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HeroSlides and returns the data saved in the database.
     * @param {HeroSlideCreateManyAndReturnArgs} args - Arguments to create many HeroSlides.
     * @example
     * // Create many HeroSlides
     * const heroSlide = await prisma.heroSlide.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HeroSlides and only return the `id`
     * const heroSlideWithIdOnly = await prisma.heroSlide.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HeroSlideCreateManyAndReturnArgs>(args?: SelectSubset<T, HeroSlideCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HeroSlidePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HeroSlide.
     * @param {HeroSlideDeleteArgs} args - Arguments to delete one HeroSlide.
     * @example
     * // Delete one HeroSlide
     * const HeroSlide = await prisma.heroSlide.delete({
     *   where: {
     *     // ... filter to delete one HeroSlide
     *   }
     * })
     * 
     */
    delete<T extends HeroSlideDeleteArgs>(args: SelectSubset<T, HeroSlideDeleteArgs<ExtArgs>>): Prisma__HeroSlideClient<$Result.GetResult<Prisma.$HeroSlidePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HeroSlide.
     * @param {HeroSlideUpdateArgs} args - Arguments to update one HeroSlide.
     * @example
     * // Update one HeroSlide
     * const heroSlide = await prisma.heroSlide.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HeroSlideUpdateArgs>(args: SelectSubset<T, HeroSlideUpdateArgs<ExtArgs>>): Prisma__HeroSlideClient<$Result.GetResult<Prisma.$HeroSlidePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HeroSlides.
     * @param {HeroSlideDeleteManyArgs} args - Arguments to filter HeroSlides to delete.
     * @example
     * // Delete a few HeroSlides
     * const { count } = await prisma.heroSlide.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HeroSlideDeleteManyArgs>(args?: SelectSubset<T, HeroSlideDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HeroSlides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeroSlideUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HeroSlides
     * const heroSlide = await prisma.heroSlide.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HeroSlideUpdateManyArgs>(args: SelectSubset<T, HeroSlideUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HeroSlides and returns the data updated in the database.
     * @param {HeroSlideUpdateManyAndReturnArgs} args - Arguments to update many HeroSlides.
     * @example
     * // Update many HeroSlides
     * const heroSlide = await prisma.heroSlide.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HeroSlides and only return the `id`
     * const heroSlideWithIdOnly = await prisma.heroSlide.updateManyAndReturn({
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
    updateManyAndReturn<T extends HeroSlideUpdateManyAndReturnArgs>(args: SelectSubset<T, HeroSlideUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HeroSlidePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HeroSlide.
     * @param {HeroSlideUpsertArgs} args - Arguments to update or create a HeroSlide.
     * @example
     * // Update or create a HeroSlide
     * const heroSlide = await prisma.heroSlide.upsert({
     *   create: {
     *     // ... data to create a HeroSlide
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HeroSlide we want to update
     *   }
     * })
     */
    upsert<T extends HeroSlideUpsertArgs>(args: SelectSubset<T, HeroSlideUpsertArgs<ExtArgs>>): Prisma__HeroSlideClient<$Result.GetResult<Prisma.$HeroSlidePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HeroSlides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeroSlideCountArgs} args - Arguments to filter HeroSlides to count.
     * @example
     * // Count the number of HeroSlides
     * const count = await prisma.heroSlide.count({
     *   where: {
     *     // ... the filter for the HeroSlides we want to count
     *   }
     * })
    **/
    count<T extends HeroSlideCountArgs>(
      args?: Subset<T, HeroSlideCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HeroSlideCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HeroSlide.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeroSlideAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HeroSlideAggregateArgs>(args: Subset<T, HeroSlideAggregateArgs>): Prisma.PrismaPromise<GetHeroSlideAggregateType<T>>

    /**
     * Group by HeroSlide.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeroSlideGroupByArgs} args - Group by arguments.
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
      T extends HeroSlideGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HeroSlideGroupByArgs['orderBy'] }
        : { orderBy?: HeroSlideGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, HeroSlideGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHeroSlideGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HeroSlide model
   */
  readonly fields: HeroSlideFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HeroSlide.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HeroSlideClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the HeroSlide model
   */
  interface HeroSlideFieldRefs {
    readonly id: FieldRef<"HeroSlide", 'String'>
    readonly title: FieldRef<"HeroSlide", 'String'>
    readonly subtitle: FieldRef<"HeroSlide", 'String'>
    readonly imageUrl: FieldRef<"HeroSlide", 'String'>
    readonly ctaText: FieldRef<"HeroSlide", 'String'>
    readonly ctaUrl: FieldRef<"HeroSlide", 'String'>
    readonly active: FieldRef<"HeroSlide", 'Boolean'>
    readonly sortOrder: FieldRef<"HeroSlide", 'Int'>
    readonly createdAt: FieldRef<"HeroSlide", 'DateTime'>
    readonly updatedAt: FieldRef<"HeroSlide", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HeroSlide findUnique
   */
  export type HeroSlideFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
    /**
     * Filter, which HeroSlide to fetch.
     */
    where: HeroSlideWhereUniqueInput
  }

  /**
   * HeroSlide findUniqueOrThrow
   */
  export type HeroSlideFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
    /**
     * Filter, which HeroSlide to fetch.
     */
    where: HeroSlideWhereUniqueInput
  }

  /**
   * HeroSlide findFirst
   */
  export type HeroSlideFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
    /**
     * Filter, which HeroSlide to fetch.
     */
    where?: HeroSlideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HeroSlides to fetch.
     */
    orderBy?: HeroSlideOrderByWithRelationInput | HeroSlideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HeroSlides.
     */
    cursor?: HeroSlideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HeroSlides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HeroSlides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HeroSlides.
     */
    distinct?: HeroSlideScalarFieldEnum | HeroSlideScalarFieldEnum[]
  }

  /**
   * HeroSlide findFirstOrThrow
   */
  export type HeroSlideFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
    /**
     * Filter, which HeroSlide to fetch.
     */
    where?: HeroSlideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HeroSlides to fetch.
     */
    orderBy?: HeroSlideOrderByWithRelationInput | HeroSlideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HeroSlides.
     */
    cursor?: HeroSlideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HeroSlides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HeroSlides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HeroSlides.
     */
    distinct?: HeroSlideScalarFieldEnum | HeroSlideScalarFieldEnum[]
  }

  /**
   * HeroSlide findMany
   */
  export type HeroSlideFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
    /**
     * Filter, which HeroSlides to fetch.
     */
    where?: HeroSlideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HeroSlides to fetch.
     */
    orderBy?: HeroSlideOrderByWithRelationInput | HeroSlideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HeroSlides.
     */
    cursor?: HeroSlideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HeroSlides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HeroSlides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HeroSlides.
     */
    distinct?: HeroSlideScalarFieldEnum | HeroSlideScalarFieldEnum[]
  }

  /**
   * HeroSlide create
   */
  export type HeroSlideCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
    /**
     * The data needed to create a HeroSlide.
     */
    data: XOR<HeroSlideCreateInput, HeroSlideUncheckedCreateInput>
  }

  /**
   * HeroSlide createMany
   */
  export type HeroSlideCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HeroSlides.
     */
    data: HeroSlideCreateManyInput | HeroSlideCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HeroSlide createManyAndReturn
   */
  export type HeroSlideCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
    /**
     * The data used to create many HeroSlides.
     */
    data: HeroSlideCreateManyInput | HeroSlideCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HeroSlide update
   */
  export type HeroSlideUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
    /**
     * The data needed to update a HeroSlide.
     */
    data: XOR<HeroSlideUpdateInput, HeroSlideUncheckedUpdateInput>
    /**
     * Choose, which HeroSlide to update.
     */
    where: HeroSlideWhereUniqueInput
  }

  /**
   * HeroSlide updateMany
   */
  export type HeroSlideUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HeroSlides.
     */
    data: XOR<HeroSlideUpdateManyMutationInput, HeroSlideUncheckedUpdateManyInput>
    /**
     * Filter which HeroSlides to update
     */
    where?: HeroSlideWhereInput
    /**
     * Limit how many HeroSlides to update.
     */
    limit?: number
  }

  /**
   * HeroSlide updateManyAndReturn
   */
  export type HeroSlideUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
    /**
     * The data used to update HeroSlides.
     */
    data: XOR<HeroSlideUpdateManyMutationInput, HeroSlideUncheckedUpdateManyInput>
    /**
     * Filter which HeroSlides to update
     */
    where?: HeroSlideWhereInput
    /**
     * Limit how many HeroSlides to update.
     */
    limit?: number
  }

  /**
   * HeroSlide upsert
   */
  export type HeroSlideUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
    /**
     * The filter to search for the HeroSlide to update in case it exists.
     */
    where: HeroSlideWhereUniqueInput
    /**
     * In case the HeroSlide found by the `where` argument doesn't exist, create a new HeroSlide with this data.
     */
    create: XOR<HeroSlideCreateInput, HeroSlideUncheckedCreateInput>
    /**
     * In case the HeroSlide was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HeroSlideUpdateInput, HeroSlideUncheckedUpdateInput>
  }

  /**
   * HeroSlide delete
   */
  export type HeroSlideDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
    /**
     * Filter which HeroSlide to delete.
     */
    where: HeroSlideWhereUniqueInput
  }

  /**
   * HeroSlide deleteMany
   */
  export type HeroSlideDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HeroSlides to delete
     */
    where?: HeroSlideWhereInput
    /**
     * Limit how many HeroSlides to delete.
     */
    limit?: number
  }

  /**
   * HeroSlide without action
   */
  export type HeroSlideDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
  }


  /**
   * Model SupportConversation
   */

  export type AggregateSupportConversation = {
    _count: SupportConversationCountAggregateOutputType | null
    _min: SupportConversationMinAggregateOutputType | null
    _max: SupportConversationMaxAggregateOutputType | null
  }

  export type SupportConversationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    guestName: string | null
    guestPhone: string | null
    status: $Enums.ConversationStatus | null
    subject: string | null
    createdAt: Date | null
    updatedAt: Date | null
    lastMessageAt: Date | null
    pharmacistId: string | null
    isRead: boolean | null
  }

  export type SupportConversationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    guestName: string | null
    guestPhone: string | null
    status: $Enums.ConversationStatus | null
    subject: string | null
    createdAt: Date | null
    updatedAt: Date | null
    lastMessageAt: Date | null
    pharmacistId: string | null
    isRead: boolean | null
  }

  export type SupportConversationCountAggregateOutputType = {
    id: number
    userId: number
    guestName: number
    guestPhone: number
    status: number
    subject: number
    createdAt: number
    updatedAt: number
    lastMessageAt: number
    pharmacistId: number
    isRead: number
    _all: number
  }


  export type SupportConversationMinAggregateInputType = {
    id?: true
    userId?: true
    guestName?: true
    guestPhone?: true
    status?: true
    subject?: true
    createdAt?: true
    updatedAt?: true
    lastMessageAt?: true
    pharmacistId?: true
    isRead?: true
  }

  export type SupportConversationMaxAggregateInputType = {
    id?: true
    userId?: true
    guestName?: true
    guestPhone?: true
    status?: true
    subject?: true
    createdAt?: true
    updatedAt?: true
    lastMessageAt?: true
    pharmacistId?: true
    isRead?: true
  }

  export type SupportConversationCountAggregateInputType = {
    id?: true
    userId?: true
    guestName?: true
    guestPhone?: true
    status?: true
    subject?: true
    createdAt?: true
    updatedAt?: true
    lastMessageAt?: true
    pharmacistId?: true
    isRead?: true
    _all?: true
  }

  export type SupportConversationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportConversation to aggregate.
     */
    where?: SupportConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportConversations to fetch.
     */
    orderBy?: SupportConversationOrderByWithRelationInput | SupportConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupportConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportConversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SupportConversations
    **/
    _count?: true | SupportConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupportConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupportConversationMaxAggregateInputType
  }

  export type GetSupportConversationAggregateType<T extends SupportConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateSupportConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupportConversation[P]>
      : GetScalarType<T[P], AggregateSupportConversation[P]>
  }




  export type SupportConversationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportConversationWhereInput
    orderBy?: SupportConversationOrderByWithAggregationInput | SupportConversationOrderByWithAggregationInput[]
    by: SupportConversationScalarFieldEnum[] | SupportConversationScalarFieldEnum
    having?: SupportConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupportConversationCountAggregateInputType | true
    _min?: SupportConversationMinAggregateInputType
    _max?: SupportConversationMaxAggregateInputType
  }

  export type SupportConversationGroupByOutputType = {
    id: string
    userId: string | null
    guestName: string | null
    guestPhone: string | null
    status: $Enums.ConversationStatus
    subject: string | null
    createdAt: Date
    updatedAt: Date
    lastMessageAt: Date
    pharmacistId: string | null
    isRead: boolean
    _count: SupportConversationCountAggregateOutputType | null
    _min: SupportConversationMinAggregateOutputType | null
    _max: SupportConversationMaxAggregateOutputType | null
  }

  type GetSupportConversationGroupByPayload<T extends SupportConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupportConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupportConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupportConversationGroupByOutputType[P]>
            : GetScalarType<T[P], SupportConversationGroupByOutputType[P]>
        }
      >
    >


  export type SupportConversationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    guestName?: boolean
    guestPhone?: boolean
    status?: boolean
    subject?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastMessageAt?: boolean
    pharmacistId?: boolean
    isRead?: boolean
    messages?: boolean | SupportConversation$messagesArgs<ExtArgs>
    _count?: boolean | SupportConversationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supportConversation"]>

  export type SupportConversationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    guestName?: boolean
    guestPhone?: boolean
    status?: boolean
    subject?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastMessageAt?: boolean
    pharmacistId?: boolean
    isRead?: boolean
  }, ExtArgs["result"]["supportConversation"]>

  export type SupportConversationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    guestName?: boolean
    guestPhone?: boolean
    status?: boolean
    subject?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastMessageAt?: boolean
    pharmacistId?: boolean
    isRead?: boolean
  }, ExtArgs["result"]["supportConversation"]>

  export type SupportConversationSelectScalar = {
    id?: boolean
    userId?: boolean
    guestName?: boolean
    guestPhone?: boolean
    status?: boolean
    subject?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastMessageAt?: boolean
    pharmacistId?: boolean
    isRead?: boolean
  }

  export type SupportConversationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "guestName" | "guestPhone" | "status" | "subject" | "createdAt" | "updatedAt" | "lastMessageAt" | "pharmacistId" | "isRead", ExtArgs["result"]["supportConversation"]>
  export type SupportConversationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | SupportConversation$messagesArgs<ExtArgs>
    _count?: boolean | SupportConversationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SupportConversationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SupportConversationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SupportConversationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SupportConversation"
    objects: {
      messages: Prisma.$SupportMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      guestName: string | null
      guestPhone: string | null
      status: $Enums.ConversationStatus
      subject: string | null
      createdAt: Date
      updatedAt: Date
      lastMessageAt: Date
      pharmacistId: string | null
      isRead: boolean
    }, ExtArgs["result"]["supportConversation"]>
    composites: {}
  }

  type SupportConversationGetPayload<S extends boolean | null | undefined | SupportConversationDefaultArgs> = $Result.GetResult<Prisma.$SupportConversationPayload, S>

  type SupportConversationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SupportConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SupportConversationCountAggregateInputType | true
    }

  export interface SupportConversationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SupportConversation'], meta: { name: 'SupportConversation' } }
    /**
     * Find zero or one SupportConversation that matches the filter.
     * @param {SupportConversationFindUniqueArgs} args - Arguments to find a SupportConversation
     * @example
     * // Get one SupportConversation
     * const supportConversation = await prisma.supportConversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupportConversationFindUniqueArgs>(args: SelectSubset<T, SupportConversationFindUniqueArgs<ExtArgs>>): Prisma__SupportConversationClient<$Result.GetResult<Prisma.$SupportConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SupportConversation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SupportConversationFindUniqueOrThrowArgs} args - Arguments to find a SupportConversation
     * @example
     * // Get one SupportConversation
     * const supportConversation = await prisma.supportConversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupportConversationFindUniqueOrThrowArgs>(args: SelectSubset<T, SupportConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupportConversationClient<$Result.GetResult<Prisma.$SupportConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SupportConversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportConversationFindFirstArgs} args - Arguments to find a SupportConversation
     * @example
     * // Get one SupportConversation
     * const supportConversation = await prisma.supportConversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupportConversationFindFirstArgs>(args?: SelectSubset<T, SupportConversationFindFirstArgs<ExtArgs>>): Prisma__SupportConversationClient<$Result.GetResult<Prisma.$SupportConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SupportConversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportConversationFindFirstOrThrowArgs} args - Arguments to find a SupportConversation
     * @example
     * // Get one SupportConversation
     * const supportConversation = await prisma.supportConversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupportConversationFindFirstOrThrowArgs>(args?: SelectSubset<T, SupportConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupportConversationClient<$Result.GetResult<Prisma.$SupportConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SupportConversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SupportConversations
     * const supportConversations = await prisma.supportConversation.findMany()
     * 
     * // Get first 10 SupportConversations
     * const supportConversations = await prisma.supportConversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supportConversationWithIdOnly = await prisma.supportConversation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupportConversationFindManyArgs>(args?: SelectSubset<T, SupportConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SupportConversation.
     * @param {SupportConversationCreateArgs} args - Arguments to create a SupportConversation.
     * @example
     * // Create one SupportConversation
     * const SupportConversation = await prisma.supportConversation.create({
     *   data: {
     *     // ... data to create a SupportConversation
     *   }
     * })
     * 
     */
    create<T extends SupportConversationCreateArgs>(args: SelectSubset<T, SupportConversationCreateArgs<ExtArgs>>): Prisma__SupportConversationClient<$Result.GetResult<Prisma.$SupportConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SupportConversations.
     * @param {SupportConversationCreateManyArgs} args - Arguments to create many SupportConversations.
     * @example
     * // Create many SupportConversations
     * const supportConversation = await prisma.supportConversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupportConversationCreateManyArgs>(args?: SelectSubset<T, SupportConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SupportConversations and returns the data saved in the database.
     * @param {SupportConversationCreateManyAndReturnArgs} args - Arguments to create many SupportConversations.
     * @example
     * // Create many SupportConversations
     * const supportConversation = await prisma.supportConversation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SupportConversations and only return the `id`
     * const supportConversationWithIdOnly = await prisma.supportConversation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SupportConversationCreateManyAndReturnArgs>(args?: SelectSubset<T, SupportConversationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportConversationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SupportConversation.
     * @param {SupportConversationDeleteArgs} args - Arguments to delete one SupportConversation.
     * @example
     * // Delete one SupportConversation
     * const SupportConversation = await prisma.supportConversation.delete({
     *   where: {
     *     // ... filter to delete one SupportConversation
     *   }
     * })
     * 
     */
    delete<T extends SupportConversationDeleteArgs>(args: SelectSubset<T, SupportConversationDeleteArgs<ExtArgs>>): Prisma__SupportConversationClient<$Result.GetResult<Prisma.$SupportConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SupportConversation.
     * @param {SupportConversationUpdateArgs} args - Arguments to update one SupportConversation.
     * @example
     * // Update one SupportConversation
     * const supportConversation = await prisma.supportConversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupportConversationUpdateArgs>(args: SelectSubset<T, SupportConversationUpdateArgs<ExtArgs>>): Prisma__SupportConversationClient<$Result.GetResult<Prisma.$SupportConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SupportConversations.
     * @param {SupportConversationDeleteManyArgs} args - Arguments to filter SupportConversations to delete.
     * @example
     * // Delete a few SupportConversations
     * const { count } = await prisma.supportConversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupportConversationDeleteManyArgs>(args?: SelectSubset<T, SupportConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupportConversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SupportConversations
     * const supportConversation = await prisma.supportConversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupportConversationUpdateManyArgs>(args: SelectSubset<T, SupportConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupportConversations and returns the data updated in the database.
     * @param {SupportConversationUpdateManyAndReturnArgs} args - Arguments to update many SupportConversations.
     * @example
     * // Update many SupportConversations
     * const supportConversation = await prisma.supportConversation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SupportConversations and only return the `id`
     * const supportConversationWithIdOnly = await prisma.supportConversation.updateManyAndReturn({
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
    updateManyAndReturn<T extends SupportConversationUpdateManyAndReturnArgs>(args: SelectSubset<T, SupportConversationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportConversationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SupportConversation.
     * @param {SupportConversationUpsertArgs} args - Arguments to update or create a SupportConversation.
     * @example
     * // Update or create a SupportConversation
     * const supportConversation = await prisma.supportConversation.upsert({
     *   create: {
     *     // ... data to create a SupportConversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SupportConversation we want to update
     *   }
     * })
     */
    upsert<T extends SupportConversationUpsertArgs>(args: SelectSubset<T, SupportConversationUpsertArgs<ExtArgs>>): Prisma__SupportConversationClient<$Result.GetResult<Prisma.$SupportConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SupportConversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportConversationCountArgs} args - Arguments to filter SupportConversations to count.
     * @example
     * // Count the number of SupportConversations
     * const count = await prisma.supportConversation.count({
     *   where: {
     *     // ... the filter for the SupportConversations we want to count
     *   }
     * })
    **/
    count<T extends SupportConversationCountArgs>(
      args?: Subset<T, SupportConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupportConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SupportConversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SupportConversationAggregateArgs>(args: Subset<T, SupportConversationAggregateArgs>): Prisma.PrismaPromise<GetSupportConversationAggregateType<T>>

    /**
     * Group by SupportConversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportConversationGroupByArgs} args - Group by arguments.
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
      T extends SupportConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupportConversationGroupByArgs['orderBy'] }
        : { orderBy?: SupportConversationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SupportConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupportConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SupportConversation model
   */
  readonly fields: SupportConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SupportConversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupportConversationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    messages<T extends SupportConversation$messagesArgs<ExtArgs> = {}>(args?: Subset<T, SupportConversation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the SupportConversation model
   */
  interface SupportConversationFieldRefs {
    readonly id: FieldRef<"SupportConversation", 'String'>
    readonly userId: FieldRef<"SupportConversation", 'String'>
    readonly guestName: FieldRef<"SupportConversation", 'String'>
    readonly guestPhone: FieldRef<"SupportConversation", 'String'>
    readonly status: FieldRef<"SupportConversation", 'ConversationStatus'>
    readonly subject: FieldRef<"SupportConversation", 'String'>
    readonly createdAt: FieldRef<"SupportConversation", 'DateTime'>
    readonly updatedAt: FieldRef<"SupportConversation", 'DateTime'>
    readonly lastMessageAt: FieldRef<"SupportConversation", 'DateTime'>
    readonly pharmacistId: FieldRef<"SupportConversation", 'String'>
    readonly isRead: FieldRef<"SupportConversation", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * SupportConversation findUnique
   */
  export type SupportConversationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportConversation
     */
    select?: SupportConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportConversation
     */
    omit?: SupportConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportConversationInclude<ExtArgs> | null
    /**
     * Filter, which SupportConversation to fetch.
     */
    where: SupportConversationWhereUniqueInput
  }

  /**
   * SupportConversation findUniqueOrThrow
   */
  export type SupportConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportConversation
     */
    select?: SupportConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportConversation
     */
    omit?: SupportConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportConversationInclude<ExtArgs> | null
    /**
     * Filter, which SupportConversation to fetch.
     */
    where: SupportConversationWhereUniqueInput
  }

  /**
   * SupportConversation findFirst
   */
  export type SupportConversationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportConversation
     */
    select?: SupportConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportConversation
     */
    omit?: SupportConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportConversationInclude<ExtArgs> | null
    /**
     * Filter, which SupportConversation to fetch.
     */
    where?: SupportConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportConversations to fetch.
     */
    orderBy?: SupportConversationOrderByWithRelationInput | SupportConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportConversations.
     */
    cursor?: SupportConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportConversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportConversations.
     */
    distinct?: SupportConversationScalarFieldEnum | SupportConversationScalarFieldEnum[]
  }

  /**
   * SupportConversation findFirstOrThrow
   */
  export type SupportConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportConversation
     */
    select?: SupportConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportConversation
     */
    omit?: SupportConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportConversationInclude<ExtArgs> | null
    /**
     * Filter, which SupportConversation to fetch.
     */
    where?: SupportConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportConversations to fetch.
     */
    orderBy?: SupportConversationOrderByWithRelationInput | SupportConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportConversations.
     */
    cursor?: SupportConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportConversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportConversations.
     */
    distinct?: SupportConversationScalarFieldEnum | SupportConversationScalarFieldEnum[]
  }

  /**
   * SupportConversation findMany
   */
  export type SupportConversationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportConversation
     */
    select?: SupportConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportConversation
     */
    omit?: SupportConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportConversationInclude<ExtArgs> | null
    /**
     * Filter, which SupportConversations to fetch.
     */
    where?: SupportConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportConversations to fetch.
     */
    orderBy?: SupportConversationOrderByWithRelationInput | SupportConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SupportConversations.
     */
    cursor?: SupportConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportConversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportConversations.
     */
    distinct?: SupportConversationScalarFieldEnum | SupportConversationScalarFieldEnum[]
  }

  /**
   * SupportConversation create
   */
  export type SupportConversationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportConversation
     */
    select?: SupportConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportConversation
     */
    omit?: SupportConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a SupportConversation.
     */
    data: XOR<SupportConversationCreateInput, SupportConversationUncheckedCreateInput>
  }

  /**
   * SupportConversation createMany
   */
  export type SupportConversationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SupportConversations.
     */
    data: SupportConversationCreateManyInput | SupportConversationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SupportConversation createManyAndReturn
   */
  export type SupportConversationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportConversation
     */
    select?: SupportConversationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SupportConversation
     */
    omit?: SupportConversationOmit<ExtArgs> | null
    /**
     * The data used to create many SupportConversations.
     */
    data: SupportConversationCreateManyInput | SupportConversationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SupportConversation update
   */
  export type SupportConversationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportConversation
     */
    select?: SupportConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportConversation
     */
    omit?: SupportConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a SupportConversation.
     */
    data: XOR<SupportConversationUpdateInput, SupportConversationUncheckedUpdateInput>
    /**
     * Choose, which SupportConversation to update.
     */
    where: SupportConversationWhereUniqueInput
  }

  /**
   * SupportConversation updateMany
   */
  export type SupportConversationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SupportConversations.
     */
    data: XOR<SupportConversationUpdateManyMutationInput, SupportConversationUncheckedUpdateManyInput>
    /**
     * Filter which SupportConversations to update
     */
    where?: SupportConversationWhereInput
    /**
     * Limit how many SupportConversations to update.
     */
    limit?: number
  }

  /**
   * SupportConversation updateManyAndReturn
   */
  export type SupportConversationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportConversation
     */
    select?: SupportConversationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SupportConversation
     */
    omit?: SupportConversationOmit<ExtArgs> | null
    /**
     * The data used to update SupportConversations.
     */
    data: XOR<SupportConversationUpdateManyMutationInput, SupportConversationUncheckedUpdateManyInput>
    /**
     * Filter which SupportConversations to update
     */
    where?: SupportConversationWhereInput
    /**
     * Limit how many SupportConversations to update.
     */
    limit?: number
  }

  /**
   * SupportConversation upsert
   */
  export type SupportConversationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportConversation
     */
    select?: SupportConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportConversation
     */
    omit?: SupportConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the SupportConversation to update in case it exists.
     */
    where: SupportConversationWhereUniqueInput
    /**
     * In case the SupportConversation found by the `where` argument doesn't exist, create a new SupportConversation with this data.
     */
    create: XOR<SupportConversationCreateInput, SupportConversationUncheckedCreateInput>
    /**
     * In case the SupportConversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupportConversationUpdateInput, SupportConversationUncheckedUpdateInput>
  }

  /**
   * SupportConversation delete
   */
  export type SupportConversationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportConversation
     */
    select?: SupportConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportConversation
     */
    omit?: SupportConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportConversationInclude<ExtArgs> | null
    /**
     * Filter which SupportConversation to delete.
     */
    where: SupportConversationWhereUniqueInput
  }

  /**
   * SupportConversation deleteMany
   */
  export type SupportConversationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportConversations to delete
     */
    where?: SupportConversationWhereInput
    /**
     * Limit how many SupportConversations to delete.
     */
    limit?: number
  }

  /**
   * SupportConversation.messages
   */
  export type SupportConversation$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    where?: SupportMessageWhereInput
    orderBy?: SupportMessageOrderByWithRelationInput | SupportMessageOrderByWithRelationInput[]
    cursor?: SupportMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SupportMessageScalarFieldEnum | SupportMessageScalarFieldEnum[]
  }

  /**
   * SupportConversation without action
   */
  export type SupportConversationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportConversation
     */
    select?: SupportConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportConversation
     */
    omit?: SupportConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportConversationInclude<ExtArgs> | null
  }


  /**
   * Model SupportMessage
   */

  export type AggregateSupportMessage = {
    _count: SupportMessageCountAggregateOutputType | null
    _avg: SupportMessageAvgAggregateOutputType | null
    _sum: SupportMessageSumAggregateOutputType | null
    _min: SupportMessageMinAggregateOutputType | null
    _max: SupportMessageMaxAggregateOutputType | null
  }

  export type SupportMessageAvgAggregateOutputType = {
    productPrice: number | null
  }

  export type SupportMessageSumAggregateOutputType = {
    productPrice: number | null
  }

  export type SupportMessageMinAggregateOutputType = {
    id: string | null
    conversationId: string | null
    content: string | null
    senderType: $Enums.SenderType | null
    senderName: string | null
    createdAt: Date | null
    isRead: boolean | null
    messageType: $Enums.MessageType | null
    productId: string | null
    productName: string | null
    productPrice: number | null
    productImage: string | null
  }

  export type SupportMessageMaxAggregateOutputType = {
    id: string | null
    conversationId: string | null
    content: string | null
    senderType: $Enums.SenderType | null
    senderName: string | null
    createdAt: Date | null
    isRead: boolean | null
    messageType: $Enums.MessageType | null
    productId: string | null
    productName: string | null
    productPrice: number | null
    productImage: string | null
  }

  export type SupportMessageCountAggregateOutputType = {
    id: number
    conversationId: number
    content: number
    senderType: number
    senderName: number
    createdAt: number
    isRead: number
    messageType: number
    productId: number
    productName: number
    productPrice: number
    productImage: number
    _all: number
  }


  export type SupportMessageAvgAggregateInputType = {
    productPrice?: true
  }

  export type SupportMessageSumAggregateInputType = {
    productPrice?: true
  }

  export type SupportMessageMinAggregateInputType = {
    id?: true
    conversationId?: true
    content?: true
    senderType?: true
    senderName?: true
    createdAt?: true
    isRead?: true
    messageType?: true
    productId?: true
    productName?: true
    productPrice?: true
    productImage?: true
  }

  export type SupportMessageMaxAggregateInputType = {
    id?: true
    conversationId?: true
    content?: true
    senderType?: true
    senderName?: true
    createdAt?: true
    isRead?: true
    messageType?: true
    productId?: true
    productName?: true
    productPrice?: true
    productImage?: true
  }

  export type SupportMessageCountAggregateInputType = {
    id?: true
    conversationId?: true
    content?: true
    senderType?: true
    senderName?: true
    createdAt?: true
    isRead?: true
    messageType?: true
    productId?: true
    productName?: true
    productPrice?: true
    productImage?: true
    _all?: true
  }

  export type SupportMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportMessage to aggregate.
     */
    where?: SupportMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportMessages to fetch.
     */
    orderBy?: SupportMessageOrderByWithRelationInput | SupportMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupportMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SupportMessages
    **/
    _count?: true | SupportMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SupportMessageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SupportMessageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupportMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupportMessageMaxAggregateInputType
  }

  export type GetSupportMessageAggregateType<T extends SupportMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateSupportMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupportMessage[P]>
      : GetScalarType<T[P], AggregateSupportMessage[P]>
  }




  export type SupportMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportMessageWhereInput
    orderBy?: SupportMessageOrderByWithAggregationInput | SupportMessageOrderByWithAggregationInput[]
    by: SupportMessageScalarFieldEnum[] | SupportMessageScalarFieldEnum
    having?: SupportMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupportMessageCountAggregateInputType | true
    _avg?: SupportMessageAvgAggregateInputType
    _sum?: SupportMessageSumAggregateInputType
    _min?: SupportMessageMinAggregateInputType
    _max?: SupportMessageMaxAggregateInputType
  }

  export type SupportMessageGroupByOutputType = {
    id: string
    conversationId: string
    content: string
    senderType: $Enums.SenderType
    senderName: string
    createdAt: Date
    isRead: boolean
    messageType: $Enums.MessageType
    productId: string | null
    productName: string | null
    productPrice: number | null
    productImage: string | null
    _count: SupportMessageCountAggregateOutputType | null
    _avg: SupportMessageAvgAggregateOutputType | null
    _sum: SupportMessageSumAggregateOutputType | null
    _min: SupportMessageMinAggregateOutputType | null
    _max: SupportMessageMaxAggregateOutputType | null
  }

  type GetSupportMessageGroupByPayload<T extends SupportMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupportMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupportMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupportMessageGroupByOutputType[P]>
            : GetScalarType<T[P], SupportMessageGroupByOutputType[P]>
        }
      >
    >


  export type SupportMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    content?: boolean
    senderType?: boolean
    senderName?: boolean
    createdAt?: boolean
    isRead?: boolean
    messageType?: boolean
    productId?: boolean
    productName?: boolean
    productPrice?: boolean
    productImage?: boolean
    conversation?: boolean | SupportConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supportMessage"]>

  export type SupportMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    content?: boolean
    senderType?: boolean
    senderName?: boolean
    createdAt?: boolean
    isRead?: boolean
    messageType?: boolean
    productId?: boolean
    productName?: boolean
    productPrice?: boolean
    productImage?: boolean
    conversation?: boolean | SupportConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supportMessage"]>

  export type SupportMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    content?: boolean
    senderType?: boolean
    senderName?: boolean
    createdAt?: boolean
    isRead?: boolean
    messageType?: boolean
    productId?: boolean
    productName?: boolean
    productPrice?: boolean
    productImage?: boolean
    conversation?: boolean | SupportConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supportMessage"]>

  export type SupportMessageSelectScalar = {
    id?: boolean
    conversationId?: boolean
    content?: boolean
    senderType?: boolean
    senderName?: boolean
    createdAt?: boolean
    isRead?: boolean
    messageType?: boolean
    productId?: boolean
    productName?: boolean
    productPrice?: boolean
    productImage?: boolean
  }

  export type SupportMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conversationId" | "content" | "senderType" | "senderName" | "createdAt" | "isRead" | "messageType" | "productId" | "productName" | "productPrice" | "productImage", ExtArgs["result"]["supportMessage"]>
  export type SupportMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | SupportConversationDefaultArgs<ExtArgs>
  }
  export type SupportMessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | SupportConversationDefaultArgs<ExtArgs>
  }
  export type SupportMessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | SupportConversationDefaultArgs<ExtArgs>
  }

  export type $SupportMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SupportMessage"
    objects: {
      conversation: Prisma.$SupportConversationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conversationId: string
      content: string
      senderType: $Enums.SenderType
      senderName: string
      createdAt: Date
      isRead: boolean
      messageType: $Enums.MessageType
      productId: string | null
      productName: string | null
      productPrice: number | null
      productImage: string | null
    }, ExtArgs["result"]["supportMessage"]>
    composites: {}
  }

  type SupportMessageGetPayload<S extends boolean | null | undefined | SupportMessageDefaultArgs> = $Result.GetResult<Prisma.$SupportMessagePayload, S>

  type SupportMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SupportMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SupportMessageCountAggregateInputType | true
    }

  export interface SupportMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SupportMessage'], meta: { name: 'SupportMessage' } }
    /**
     * Find zero or one SupportMessage that matches the filter.
     * @param {SupportMessageFindUniqueArgs} args - Arguments to find a SupportMessage
     * @example
     * // Get one SupportMessage
     * const supportMessage = await prisma.supportMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupportMessageFindUniqueArgs>(args: SelectSubset<T, SupportMessageFindUniqueArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SupportMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SupportMessageFindUniqueOrThrowArgs} args - Arguments to find a SupportMessage
     * @example
     * // Get one SupportMessage
     * const supportMessage = await prisma.supportMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupportMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, SupportMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SupportMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageFindFirstArgs} args - Arguments to find a SupportMessage
     * @example
     * // Get one SupportMessage
     * const supportMessage = await prisma.supportMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupportMessageFindFirstArgs>(args?: SelectSubset<T, SupportMessageFindFirstArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SupportMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageFindFirstOrThrowArgs} args - Arguments to find a SupportMessage
     * @example
     * // Get one SupportMessage
     * const supportMessage = await prisma.supportMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupportMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, SupportMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SupportMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SupportMessages
     * const supportMessages = await prisma.supportMessage.findMany()
     * 
     * // Get first 10 SupportMessages
     * const supportMessages = await prisma.supportMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supportMessageWithIdOnly = await prisma.supportMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupportMessageFindManyArgs>(args?: SelectSubset<T, SupportMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SupportMessage.
     * @param {SupportMessageCreateArgs} args - Arguments to create a SupportMessage.
     * @example
     * // Create one SupportMessage
     * const SupportMessage = await prisma.supportMessage.create({
     *   data: {
     *     // ... data to create a SupportMessage
     *   }
     * })
     * 
     */
    create<T extends SupportMessageCreateArgs>(args: SelectSubset<T, SupportMessageCreateArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SupportMessages.
     * @param {SupportMessageCreateManyArgs} args - Arguments to create many SupportMessages.
     * @example
     * // Create many SupportMessages
     * const supportMessage = await prisma.supportMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupportMessageCreateManyArgs>(args?: SelectSubset<T, SupportMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SupportMessages and returns the data saved in the database.
     * @param {SupportMessageCreateManyAndReturnArgs} args - Arguments to create many SupportMessages.
     * @example
     * // Create many SupportMessages
     * const supportMessage = await prisma.supportMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SupportMessages and only return the `id`
     * const supportMessageWithIdOnly = await prisma.supportMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SupportMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, SupportMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SupportMessage.
     * @param {SupportMessageDeleteArgs} args - Arguments to delete one SupportMessage.
     * @example
     * // Delete one SupportMessage
     * const SupportMessage = await prisma.supportMessage.delete({
     *   where: {
     *     // ... filter to delete one SupportMessage
     *   }
     * })
     * 
     */
    delete<T extends SupportMessageDeleteArgs>(args: SelectSubset<T, SupportMessageDeleteArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SupportMessage.
     * @param {SupportMessageUpdateArgs} args - Arguments to update one SupportMessage.
     * @example
     * // Update one SupportMessage
     * const supportMessage = await prisma.supportMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupportMessageUpdateArgs>(args: SelectSubset<T, SupportMessageUpdateArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SupportMessages.
     * @param {SupportMessageDeleteManyArgs} args - Arguments to filter SupportMessages to delete.
     * @example
     * // Delete a few SupportMessages
     * const { count } = await prisma.supportMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupportMessageDeleteManyArgs>(args?: SelectSubset<T, SupportMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupportMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SupportMessages
     * const supportMessage = await prisma.supportMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupportMessageUpdateManyArgs>(args: SelectSubset<T, SupportMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupportMessages and returns the data updated in the database.
     * @param {SupportMessageUpdateManyAndReturnArgs} args - Arguments to update many SupportMessages.
     * @example
     * // Update many SupportMessages
     * const supportMessage = await prisma.supportMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SupportMessages and only return the `id`
     * const supportMessageWithIdOnly = await prisma.supportMessage.updateManyAndReturn({
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
    updateManyAndReturn<T extends SupportMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, SupportMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SupportMessage.
     * @param {SupportMessageUpsertArgs} args - Arguments to update or create a SupportMessage.
     * @example
     * // Update or create a SupportMessage
     * const supportMessage = await prisma.supportMessage.upsert({
     *   create: {
     *     // ... data to create a SupportMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SupportMessage we want to update
     *   }
     * })
     */
    upsert<T extends SupportMessageUpsertArgs>(args: SelectSubset<T, SupportMessageUpsertArgs<ExtArgs>>): Prisma__SupportMessageClient<$Result.GetResult<Prisma.$SupportMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SupportMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageCountArgs} args - Arguments to filter SupportMessages to count.
     * @example
     * // Count the number of SupportMessages
     * const count = await prisma.supportMessage.count({
     *   where: {
     *     // ... the filter for the SupportMessages we want to count
     *   }
     * })
    **/
    count<T extends SupportMessageCountArgs>(
      args?: Subset<T, SupportMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupportMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SupportMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SupportMessageAggregateArgs>(args: Subset<T, SupportMessageAggregateArgs>): Prisma.PrismaPromise<GetSupportMessageAggregateType<T>>

    /**
     * Group by SupportMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportMessageGroupByArgs} args - Group by arguments.
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
      T extends SupportMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupportMessageGroupByArgs['orderBy'] }
        : { orderBy?: SupportMessageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SupportMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupportMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SupportMessage model
   */
  readonly fields: SupportMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SupportMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupportMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends SupportConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SupportConversationDefaultArgs<ExtArgs>>): Prisma__SupportConversationClient<$Result.GetResult<Prisma.$SupportConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SupportMessage model
   */
  interface SupportMessageFieldRefs {
    readonly id: FieldRef<"SupportMessage", 'String'>
    readonly conversationId: FieldRef<"SupportMessage", 'String'>
    readonly content: FieldRef<"SupportMessage", 'String'>
    readonly senderType: FieldRef<"SupportMessage", 'SenderType'>
    readonly senderName: FieldRef<"SupportMessage", 'String'>
    readonly createdAt: FieldRef<"SupportMessage", 'DateTime'>
    readonly isRead: FieldRef<"SupportMessage", 'Boolean'>
    readonly messageType: FieldRef<"SupportMessage", 'MessageType'>
    readonly productId: FieldRef<"SupportMessage", 'String'>
    readonly productName: FieldRef<"SupportMessage", 'String'>
    readonly productPrice: FieldRef<"SupportMessage", 'Float'>
    readonly productImage: FieldRef<"SupportMessage", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SupportMessage findUnique
   */
  export type SupportMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * Filter, which SupportMessage to fetch.
     */
    where: SupportMessageWhereUniqueInput
  }

  /**
   * SupportMessage findUniqueOrThrow
   */
  export type SupportMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * Filter, which SupportMessage to fetch.
     */
    where: SupportMessageWhereUniqueInput
  }

  /**
   * SupportMessage findFirst
   */
  export type SupportMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * Filter, which SupportMessage to fetch.
     */
    where?: SupportMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportMessages to fetch.
     */
    orderBy?: SupportMessageOrderByWithRelationInput | SupportMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportMessages.
     */
    cursor?: SupportMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportMessages.
     */
    distinct?: SupportMessageScalarFieldEnum | SupportMessageScalarFieldEnum[]
  }

  /**
   * SupportMessage findFirstOrThrow
   */
  export type SupportMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * Filter, which SupportMessage to fetch.
     */
    where?: SupportMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportMessages to fetch.
     */
    orderBy?: SupportMessageOrderByWithRelationInput | SupportMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportMessages.
     */
    cursor?: SupportMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportMessages.
     */
    distinct?: SupportMessageScalarFieldEnum | SupportMessageScalarFieldEnum[]
  }

  /**
   * SupportMessage findMany
   */
  export type SupportMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * Filter, which SupportMessages to fetch.
     */
    where?: SupportMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportMessages to fetch.
     */
    orderBy?: SupportMessageOrderByWithRelationInput | SupportMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SupportMessages.
     */
    cursor?: SupportMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportMessages.
     */
    distinct?: SupportMessageScalarFieldEnum | SupportMessageScalarFieldEnum[]
  }

  /**
   * SupportMessage create
   */
  export type SupportMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a SupportMessage.
     */
    data: XOR<SupportMessageCreateInput, SupportMessageUncheckedCreateInput>
  }

  /**
   * SupportMessage createMany
   */
  export type SupportMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SupportMessages.
     */
    data: SupportMessageCreateManyInput | SupportMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SupportMessage createManyAndReturn
   */
  export type SupportMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * The data used to create many SupportMessages.
     */
    data: SupportMessageCreateManyInput | SupportMessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SupportMessage update
   */
  export type SupportMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a SupportMessage.
     */
    data: XOR<SupportMessageUpdateInput, SupportMessageUncheckedUpdateInput>
    /**
     * Choose, which SupportMessage to update.
     */
    where: SupportMessageWhereUniqueInput
  }

  /**
   * SupportMessage updateMany
   */
  export type SupportMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SupportMessages.
     */
    data: XOR<SupportMessageUpdateManyMutationInput, SupportMessageUncheckedUpdateManyInput>
    /**
     * Filter which SupportMessages to update
     */
    where?: SupportMessageWhereInput
    /**
     * Limit how many SupportMessages to update.
     */
    limit?: number
  }

  /**
   * SupportMessage updateManyAndReturn
   */
  export type SupportMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * The data used to update SupportMessages.
     */
    data: XOR<SupportMessageUpdateManyMutationInput, SupportMessageUncheckedUpdateManyInput>
    /**
     * Filter which SupportMessages to update
     */
    where?: SupportMessageWhereInput
    /**
     * Limit how many SupportMessages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SupportMessage upsert
   */
  export type SupportMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the SupportMessage to update in case it exists.
     */
    where: SupportMessageWhereUniqueInput
    /**
     * In case the SupportMessage found by the `where` argument doesn't exist, create a new SupportMessage with this data.
     */
    create: XOR<SupportMessageCreateInput, SupportMessageUncheckedCreateInput>
    /**
     * In case the SupportMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupportMessageUpdateInput, SupportMessageUncheckedUpdateInput>
  }

  /**
   * SupportMessage delete
   */
  export type SupportMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
    /**
     * Filter which SupportMessage to delete.
     */
    where: SupportMessageWhereUniqueInput
  }

  /**
   * SupportMessage deleteMany
   */
  export type SupportMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportMessages to delete
     */
    where?: SupportMessageWhereInput
    /**
     * Limit how many SupportMessages to delete.
     */
    limit?: number
  }

  /**
   * SupportMessage without action
   */
  export type SupportMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportMessage
     */
    select?: SupportMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SupportMessage
     */
    omit?: SupportMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportMessageInclude<ExtArgs> | null
  }


  /**
   * Model CustomerReview
   */

  export type AggregateCustomerReview = {
    _count: CustomerReviewCountAggregateOutputType | null
    _avg: CustomerReviewAvgAggregateOutputType | null
    _sum: CustomerReviewSumAggregateOutputType | null
    _min: CustomerReviewMinAggregateOutputType | null
    _max: CustomerReviewMaxAggregateOutputType | null
  }

  export type CustomerReviewAvgAggregateOutputType = {
    rating: number | null
  }

  export type CustomerReviewSumAggregateOutputType = {
    rating: number | null
  }

  export type CustomerReviewMinAggregateOutputType = {
    id: string | null
    name: string | null
    rating: number | null
    message: string | null
    isApproved: boolean | null
    isRead: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerReviewMaxAggregateOutputType = {
    id: string | null
    name: string | null
    rating: number | null
    message: string | null
    isApproved: boolean | null
    isRead: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerReviewCountAggregateOutputType = {
    id: number
    name: number
    rating: number
    message: number
    isApproved: number
    isRead: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerReviewAvgAggregateInputType = {
    rating?: true
  }

  export type CustomerReviewSumAggregateInputType = {
    rating?: true
  }

  export type CustomerReviewMinAggregateInputType = {
    id?: true
    name?: true
    rating?: true
    message?: true
    isApproved?: true
    isRead?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerReviewMaxAggregateInputType = {
    id?: true
    name?: true
    rating?: true
    message?: true
    isApproved?: true
    isRead?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerReviewCountAggregateInputType = {
    id?: true
    name?: true
    rating?: true
    message?: true
    isApproved?: true
    isRead?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerReview to aggregate.
     */
    where?: CustomerReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerReviews to fetch.
     */
    orderBy?: CustomerReviewOrderByWithRelationInput | CustomerReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomerReviews
    **/
    _count?: true | CustomerReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CustomerReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CustomerReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerReviewMaxAggregateInputType
  }

  export type GetCustomerReviewAggregateType<T extends CustomerReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomerReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomerReview[P]>
      : GetScalarType<T[P], AggregateCustomerReview[P]>
  }




  export type CustomerReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerReviewWhereInput
    orderBy?: CustomerReviewOrderByWithAggregationInput | CustomerReviewOrderByWithAggregationInput[]
    by: CustomerReviewScalarFieldEnum[] | CustomerReviewScalarFieldEnum
    having?: CustomerReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerReviewCountAggregateInputType | true
    _avg?: CustomerReviewAvgAggregateInputType
    _sum?: CustomerReviewSumAggregateInputType
    _min?: CustomerReviewMinAggregateInputType
    _max?: CustomerReviewMaxAggregateInputType
  }

  export type CustomerReviewGroupByOutputType = {
    id: string
    name: string
    rating: number
    message: string
    isApproved: boolean
    isRead: boolean
    createdAt: Date
    updatedAt: Date
    _count: CustomerReviewCountAggregateOutputType | null
    _avg: CustomerReviewAvgAggregateOutputType | null
    _sum: CustomerReviewSumAggregateOutputType | null
    _min: CustomerReviewMinAggregateOutputType | null
    _max: CustomerReviewMaxAggregateOutputType | null
  }

  type GetCustomerReviewGroupByPayload<T extends CustomerReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerReviewGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerReviewGroupByOutputType[P]>
        }
      >
    >


  export type CustomerReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    rating?: boolean
    message?: boolean
    isApproved?: boolean
    isRead?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customerReview"]>

  export type CustomerReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    rating?: boolean
    message?: boolean
    isApproved?: boolean
    isRead?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customerReview"]>

  export type CustomerReviewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    rating?: boolean
    message?: boolean
    isApproved?: boolean
    isRead?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customerReview"]>

  export type CustomerReviewSelectScalar = {
    id?: boolean
    name?: boolean
    rating?: boolean
    message?: boolean
    isApproved?: boolean
    isRead?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "rating" | "message" | "isApproved" | "isRead" | "createdAt" | "updatedAt", ExtArgs["result"]["customerReview"]>

  export type $CustomerReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomerReview"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      rating: number
      message: string
      isApproved: boolean
      isRead: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customerReview"]>
    composites: {}
  }

  type CustomerReviewGetPayload<S extends boolean | null | undefined | CustomerReviewDefaultArgs> = $Result.GetResult<Prisma.$CustomerReviewPayload, S>

  type CustomerReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerReviewCountAggregateInputType | true
    }

  export interface CustomerReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomerReview'], meta: { name: 'CustomerReview' } }
    /**
     * Find zero or one CustomerReview that matches the filter.
     * @param {CustomerReviewFindUniqueArgs} args - Arguments to find a CustomerReview
     * @example
     * // Get one CustomerReview
     * const customerReview = await prisma.customerReview.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerReviewFindUniqueArgs>(args: SelectSubset<T, CustomerReviewFindUniqueArgs<ExtArgs>>): Prisma__CustomerReviewClient<$Result.GetResult<Prisma.$CustomerReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CustomerReview that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerReviewFindUniqueOrThrowArgs} args - Arguments to find a CustomerReview
     * @example
     * // Get one CustomerReview
     * const customerReview = await prisma.customerReview.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerReviewClient<$Result.GetResult<Prisma.$CustomerReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerReview that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerReviewFindFirstArgs} args - Arguments to find a CustomerReview
     * @example
     * // Get one CustomerReview
     * const customerReview = await prisma.customerReview.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerReviewFindFirstArgs>(args?: SelectSubset<T, CustomerReviewFindFirstArgs<ExtArgs>>): Prisma__CustomerReviewClient<$Result.GetResult<Prisma.$CustomerReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomerReview that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerReviewFindFirstOrThrowArgs} args - Arguments to find a CustomerReview
     * @example
     * // Get one CustomerReview
     * const customerReview = await prisma.customerReview.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerReviewClient<$Result.GetResult<Prisma.$CustomerReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CustomerReviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomerReviews
     * const customerReviews = await prisma.customerReview.findMany()
     * 
     * // Get first 10 CustomerReviews
     * const customerReviews = await prisma.customerReview.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerReviewWithIdOnly = await prisma.customerReview.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerReviewFindManyArgs>(args?: SelectSubset<T, CustomerReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CustomerReview.
     * @param {CustomerReviewCreateArgs} args - Arguments to create a CustomerReview.
     * @example
     * // Create one CustomerReview
     * const CustomerReview = await prisma.customerReview.create({
     *   data: {
     *     // ... data to create a CustomerReview
     *   }
     * })
     * 
     */
    create<T extends CustomerReviewCreateArgs>(args: SelectSubset<T, CustomerReviewCreateArgs<ExtArgs>>): Prisma__CustomerReviewClient<$Result.GetResult<Prisma.$CustomerReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CustomerReviews.
     * @param {CustomerReviewCreateManyArgs} args - Arguments to create many CustomerReviews.
     * @example
     * // Create many CustomerReviews
     * const customerReview = await prisma.customerReview.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerReviewCreateManyArgs>(args?: SelectSubset<T, CustomerReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CustomerReviews and returns the data saved in the database.
     * @param {CustomerReviewCreateManyAndReturnArgs} args - Arguments to create many CustomerReviews.
     * @example
     * // Create many CustomerReviews
     * const customerReview = await prisma.customerReview.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CustomerReviews and only return the `id`
     * const customerReviewWithIdOnly = await prisma.customerReview.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CustomerReview.
     * @param {CustomerReviewDeleteArgs} args - Arguments to delete one CustomerReview.
     * @example
     * // Delete one CustomerReview
     * const CustomerReview = await prisma.customerReview.delete({
     *   where: {
     *     // ... filter to delete one CustomerReview
     *   }
     * })
     * 
     */
    delete<T extends CustomerReviewDeleteArgs>(args: SelectSubset<T, CustomerReviewDeleteArgs<ExtArgs>>): Prisma__CustomerReviewClient<$Result.GetResult<Prisma.$CustomerReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CustomerReview.
     * @param {CustomerReviewUpdateArgs} args - Arguments to update one CustomerReview.
     * @example
     * // Update one CustomerReview
     * const customerReview = await prisma.customerReview.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerReviewUpdateArgs>(args: SelectSubset<T, CustomerReviewUpdateArgs<ExtArgs>>): Prisma__CustomerReviewClient<$Result.GetResult<Prisma.$CustomerReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CustomerReviews.
     * @param {CustomerReviewDeleteManyArgs} args - Arguments to filter CustomerReviews to delete.
     * @example
     * // Delete a few CustomerReviews
     * const { count } = await prisma.customerReview.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerReviewDeleteManyArgs>(args?: SelectSubset<T, CustomerReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomerReviews
     * const customerReview = await prisma.customerReview.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerReviewUpdateManyArgs>(args: SelectSubset<T, CustomerReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomerReviews and returns the data updated in the database.
     * @param {CustomerReviewUpdateManyAndReturnArgs} args - Arguments to update many CustomerReviews.
     * @example
     * // Update many CustomerReviews
     * const customerReview = await prisma.customerReview.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CustomerReviews and only return the `id`
     * const customerReviewWithIdOnly = await prisma.customerReview.updateManyAndReturn({
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
    updateManyAndReturn<T extends CustomerReviewUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CustomerReview.
     * @param {CustomerReviewUpsertArgs} args - Arguments to update or create a CustomerReview.
     * @example
     * // Update or create a CustomerReview
     * const customerReview = await prisma.customerReview.upsert({
     *   create: {
     *     // ... data to create a CustomerReview
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomerReview we want to update
     *   }
     * })
     */
    upsert<T extends CustomerReviewUpsertArgs>(args: SelectSubset<T, CustomerReviewUpsertArgs<ExtArgs>>): Prisma__CustomerReviewClient<$Result.GetResult<Prisma.$CustomerReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CustomerReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerReviewCountArgs} args - Arguments to filter CustomerReviews to count.
     * @example
     * // Count the number of CustomerReviews
     * const count = await prisma.customerReview.count({
     *   where: {
     *     // ... the filter for the CustomerReviews we want to count
     *   }
     * })
    **/
    count<T extends CustomerReviewCountArgs>(
      args?: Subset<T, CustomerReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomerReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustomerReviewAggregateArgs>(args: Subset<T, CustomerReviewAggregateArgs>): Prisma.PrismaPromise<GetCustomerReviewAggregateType<T>>

    /**
     * Group by CustomerReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerReviewGroupByArgs} args - Group by arguments.
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
      T extends CustomerReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerReviewGroupByArgs['orderBy'] }
        : { orderBy?: CustomerReviewGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustomerReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomerReview model
   */
  readonly fields: CustomerReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomerReview.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the CustomerReview model
   */
  interface CustomerReviewFieldRefs {
    readonly id: FieldRef<"CustomerReview", 'String'>
    readonly name: FieldRef<"CustomerReview", 'String'>
    readonly rating: FieldRef<"CustomerReview", 'Int'>
    readonly message: FieldRef<"CustomerReview", 'String'>
    readonly isApproved: FieldRef<"CustomerReview", 'Boolean'>
    readonly isRead: FieldRef<"CustomerReview", 'Boolean'>
    readonly createdAt: FieldRef<"CustomerReview", 'DateTime'>
    readonly updatedAt: FieldRef<"CustomerReview", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CustomerReview findUnique
   */
  export type CustomerReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerReview
     */
    select?: CustomerReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerReview
     */
    omit?: CustomerReviewOmit<ExtArgs> | null
    /**
     * Filter, which CustomerReview to fetch.
     */
    where: CustomerReviewWhereUniqueInput
  }

  /**
   * CustomerReview findUniqueOrThrow
   */
  export type CustomerReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerReview
     */
    select?: CustomerReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerReview
     */
    omit?: CustomerReviewOmit<ExtArgs> | null
    /**
     * Filter, which CustomerReview to fetch.
     */
    where: CustomerReviewWhereUniqueInput
  }

  /**
   * CustomerReview findFirst
   */
  export type CustomerReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerReview
     */
    select?: CustomerReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerReview
     */
    omit?: CustomerReviewOmit<ExtArgs> | null
    /**
     * Filter, which CustomerReview to fetch.
     */
    where?: CustomerReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerReviews to fetch.
     */
    orderBy?: CustomerReviewOrderByWithRelationInput | CustomerReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerReviews.
     */
    cursor?: CustomerReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerReviews.
     */
    distinct?: CustomerReviewScalarFieldEnum | CustomerReviewScalarFieldEnum[]
  }

  /**
   * CustomerReview findFirstOrThrow
   */
  export type CustomerReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerReview
     */
    select?: CustomerReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerReview
     */
    omit?: CustomerReviewOmit<ExtArgs> | null
    /**
     * Filter, which CustomerReview to fetch.
     */
    where?: CustomerReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerReviews to fetch.
     */
    orderBy?: CustomerReviewOrderByWithRelationInput | CustomerReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomerReviews.
     */
    cursor?: CustomerReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerReviews.
     */
    distinct?: CustomerReviewScalarFieldEnum | CustomerReviewScalarFieldEnum[]
  }

  /**
   * CustomerReview findMany
   */
  export type CustomerReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerReview
     */
    select?: CustomerReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerReview
     */
    omit?: CustomerReviewOmit<ExtArgs> | null
    /**
     * Filter, which CustomerReviews to fetch.
     */
    where?: CustomerReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomerReviews to fetch.
     */
    orderBy?: CustomerReviewOrderByWithRelationInput | CustomerReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomerReviews.
     */
    cursor?: CustomerReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomerReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomerReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomerReviews.
     */
    distinct?: CustomerReviewScalarFieldEnum | CustomerReviewScalarFieldEnum[]
  }

  /**
   * CustomerReview create
   */
  export type CustomerReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerReview
     */
    select?: CustomerReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerReview
     */
    omit?: CustomerReviewOmit<ExtArgs> | null
    /**
     * The data needed to create a CustomerReview.
     */
    data: XOR<CustomerReviewCreateInput, CustomerReviewUncheckedCreateInput>
  }

  /**
   * CustomerReview createMany
   */
  export type CustomerReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomerReviews.
     */
    data: CustomerReviewCreateManyInput | CustomerReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomerReview createManyAndReturn
   */
  export type CustomerReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerReview
     */
    select?: CustomerReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerReview
     */
    omit?: CustomerReviewOmit<ExtArgs> | null
    /**
     * The data used to create many CustomerReviews.
     */
    data: CustomerReviewCreateManyInput | CustomerReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustomerReview update
   */
  export type CustomerReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerReview
     */
    select?: CustomerReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerReview
     */
    omit?: CustomerReviewOmit<ExtArgs> | null
    /**
     * The data needed to update a CustomerReview.
     */
    data: XOR<CustomerReviewUpdateInput, CustomerReviewUncheckedUpdateInput>
    /**
     * Choose, which CustomerReview to update.
     */
    where: CustomerReviewWhereUniqueInput
  }

  /**
   * CustomerReview updateMany
   */
  export type CustomerReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomerReviews.
     */
    data: XOR<CustomerReviewUpdateManyMutationInput, CustomerReviewUncheckedUpdateManyInput>
    /**
     * Filter which CustomerReviews to update
     */
    where?: CustomerReviewWhereInput
    /**
     * Limit how many CustomerReviews to update.
     */
    limit?: number
  }

  /**
   * CustomerReview updateManyAndReturn
   */
  export type CustomerReviewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerReview
     */
    select?: CustomerReviewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerReview
     */
    omit?: CustomerReviewOmit<ExtArgs> | null
    /**
     * The data used to update CustomerReviews.
     */
    data: XOR<CustomerReviewUpdateManyMutationInput, CustomerReviewUncheckedUpdateManyInput>
    /**
     * Filter which CustomerReviews to update
     */
    where?: CustomerReviewWhereInput
    /**
     * Limit how many CustomerReviews to update.
     */
    limit?: number
  }

  /**
   * CustomerReview upsert
   */
  export type CustomerReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerReview
     */
    select?: CustomerReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerReview
     */
    omit?: CustomerReviewOmit<ExtArgs> | null
    /**
     * The filter to search for the CustomerReview to update in case it exists.
     */
    where: CustomerReviewWhereUniqueInput
    /**
     * In case the CustomerReview found by the `where` argument doesn't exist, create a new CustomerReview with this data.
     */
    create: XOR<CustomerReviewCreateInput, CustomerReviewUncheckedCreateInput>
    /**
     * In case the CustomerReview was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerReviewUpdateInput, CustomerReviewUncheckedUpdateInput>
  }

  /**
   * CustomerReview delete
   */
  export type CustomerReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerReview
     */
    select?: CustomerReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerReview
     */
    omit?: CustomerReviewOmit<ExtArgs> | null
    /**
     * Filter which CustomerReview to delete.
     */
    where: CustomerReviewWhereUniqueInput
  }

  /**
   * CustomerReview deleteMany
   */
  export type CustomerReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomerReviews to delete
     */
    where?: CustomerReviewWhereInput
    /**
     * Limit how many CustomerReviews to delete.
     */
    limit?: number
  }

  /**
   * CustomerReview without action
   */
  export type CustomerReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerReview
     */
    select?: CustomerReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomerReview
     */
    omit?: CustomerReviewOmit<ExtArgs> | null
  }


  /**
   * Model ProductRequest
   */

  export type AggregateProductRequest = {
    _count: ProductRequestCountAggregateOutputType | null
    _min: ProductRequestMinAggregateOutputType | null
    _max: ProductRequestMaxAggregateOutputType | null
  }

  export type ProductRequestMinAggregateOutputType = {
    id: string | null
    name: string | null
    productName: string | null
    reason: string | null
    status: $Enums.ProductRequestStatus | null
    isRead: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductRequestMaxAggregateOutputType = {
    id: string | null
    name: string | null
    productName: string | null
    reason: string | null
    status: $Enums.ProductRequestStatus | null
    isRead: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductRequestCountAggregateOutputType = {
    id: number
    name: number
    productName: number
    reason: number
    status: number
    isRead: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductRequestMinAggregateInputType = {
    id?: true
    name?: true
    productName?: true
    reason?: true
    status?: true
    isRead?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductRequestMaxAggregateInputType = {
    id?: true
    name?: true
    productName?: true
    reason?: true
    status?: true
    isRead?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductRequestCountAggregateInputType = {
    id?: true
    name?: true
    productName?: true
    reason?: true
    status?: true
    isRead?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductRequest to aggregate.
     */
    where?: ProductRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductRequests to fetch.
     */
    orderBy?: ProductRequestOrderByWithRelationInput | ProductRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductRequests
    **/
    _count?: true | ProductRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductRequestMaxAggregateInputType
  }

  export type GetProductRequestAggregateType<T extends ProductRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateProductRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductRequest[P]>
      : GetScalarType<T[P], AggregateProductRequest[P]>
  }




  export type ProductRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductRequestWhereInput
    orderBy?: ProductRequestOrderByWithAggregationInput | ProductRequestOrderByWithAggregationInput[]
    by: ProductRequestScalarFieldEnum[] | ProductRequestScalarFieldEnum
    having?: ProductRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductRequestCountAggregateInputType | true
    _min?: ProductRequestMinAggregateInputType
    _max?: ProductRequestMaxAggregateInputType
  }

  export type ProductRequestGroupByOutputType = {
    id: string
    name: string
    productName: string
    reason: string | null
    status: $Enums.ProductRequestStatus
    isRead: boolean
    createdAt: Date
    updatedAt: Date
    _count: ProductRequestCountAggregateOutputType | null
    _min: ProductRequestMinAggregateOutputType | null
    _max: ProductRequestMaxAggregateOutputType | null
  }

  type GetProductRequestGroupByPayload<T extends ProductRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductRequestGroupByOutputType[P]>
            : GetScalarType<T[P], ProductRequestGroupByOutputType[P]>
        }
      >
    >


  export type ProductRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    productName?: boolean
    reason?: boolean
    status?: boolean
    isRead?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["productRequest"]>

  export type ProductRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    productName?: boolean
    reason?: boolean
    status?: boolean
    isRead?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["productRequest"]>

  export type ProductRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    productName?: boolean
    reason?: boolean
    status?: boolean
    isRead?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["productRequest"]>

  export type ProductRequestSelectScalar = {
    id?: boolean
    name?: boolean
    productName?: boolean
    reason?: boolean
    status?: boolean
    isRead?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "productName" | "reason" | "status" | "isRead" | "createdAt" | "updatedAt", ExtArgs["result"]["productRequest"]>

  export type $ProductRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductRequest"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      productName: string
      reason: string | null
      status: $Enums.ProductRequestStatus
      isRead: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["productRequest"]>
    composites: {}
  }

  type ProductRequestGetPayload<S extends boolean | null | undefined | ProductRequestDefaultArgs> = $Result.GetResult<Prisma.$ProductRequestPayload, S>

  type ProductRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductRequestCountAggregateInputType | true
    }

  export interface ProductRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductRequest'], meta: { name: 'ProductRequest' } }
    /**
     * Find zero or one ProductRequest that matches the filter.
     * @param {ProductRequestFindUniqueArgs} args - Arguments to find a ProductRequest
     * @example
     * // Get one ProductRequest
     * const productRequest = await prisma.productRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductRequestFindUniqueArgs>(args: SelectSubset<T, ProductRequestFindUniqueArgs<ExtArgs>>): Prisma__ProductRequestClient<$Result.GetResult<Prisma.$ProductRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductRequestFindUniqueOrThrowArgs} args - Arguments to find a ProductRequest
     * @example
     * // Get one ProductRequest
     * const productRequest = await prisma.productRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductRequestClient<$Result.GetResult<Prisma.$ProductRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductRequestFindFirstArgs} args - Arguments to find a ProductRequest
     * @example
     * // Get one ProductRequest
     * const productRequest = await prisma.productRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductRequestFindFirstArgs>(args?: SelectSubset<T, ProductRequestFindFirstArgs<ExtArgs>>): Prisma__ProductRequestClient<$Result.GetResult<Prisma.$ProductRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductRequestFindFirstOrThrowArgs} args - Arguments to find a ProductRequest
     * @example
     * // Get one ProductRequest
     * const productRequest = await prisma.productRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductRequestClient<$Result.GetResult<Prisma.$ProductRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductRequests
     * const productRequests = await prisma.productRequest.findMany()
     * 
     * // Get first 10 ProductRequests
     * const productRequests = await prisma.productRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productRequestWithIdOnly = await prisma.productRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductRequestFindManyArgs>(args?: SelectSubset<T, ProductRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductRequest.
     * @param {ProductRequestCreateArgs} args - Arguments to create a ProductRequest.
     * @example
     * // Create one ProductRequest
     * const ProductRequest = await prisma.productRequest.create({
     *   data: {
     *     // ... data to create a ProductRequest
     *   }
     * })
     * 
     */
    create<T extends ProductRequestCreateArgs>(args: SelectSubset<T, ProductRequestCreateArgs<ExtArgs>>): Prisma__ProductRequestClient<$Result.GetResult<Prisma.$ProductRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductRequests.
     * @param {ProductRequestCreateManyArgs} args - Arguments to create many ProductRequests.
     * @example
     * // Create many ProductRequests
     * const productRequest = await prisma.productRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductRequestCreateManyArgs>(args?: SelectSubset<T, ProductRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductRequests and returns the data saved in the database.
     * @param {ProductRequestCreateManyAndReturnArgs} args - Arguments to create many ProductRequests.
     * @example
     * // Create many ProductRequests
     * const productRequest = await prisma.productRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductRequests and only return the `id`
     * const productRequestWithIdOnly = await prisma.productRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductRequest.
     * @param {ProductRequestDeleteArgs} args - Arguments to delete one ProductRequest.
     * @example
     * // Delete one ProductRequest
     * const ProductRequest = await prisma.productRequest.delete({
     *   where: {
     *     // ... filter to delete one ProductRequest
     *   }
     * })
     * 
     */
    delete<T extends ProductRequestDeleteArgs>(args: SelectSubset<T, ProductRequestDeleteArgs<ExtArgs>>): Prisma__ProductRequestClient<$Result.GetResult<Prisma.$ProductRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductRequest.
     * @param {ProductRequestUpdateArgs} args - Arguments to update one ProductRequest.
     * @example
     * // Update one ProductRequest
     * const productRequest = await prisma.productRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductRequestUpdateArgs>(args: SelectSubset<T, ProductRequestUpdateArgs<ExtArgs>>): Prisma__ProductRequestClient<$Result.GetResult<Prisma.$ProductRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductRequests.
     * @param {ProductRequestDeleteManyArgs} args - Arguments to filter ProductRequests to delete.
     * @example
     * // Delete a few ProductRequests
     * const { count } = await prisma.productRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductRequestDeleteManyArgs>(args?: SelectSubset<T, ProductRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductRequests
     * const productRequest = await prisma.productRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductRequestUpdateManyArgs>(args: SelectSubset<T, ProductRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductRequests and returns the data updated in the database.
     * @param {ProductRequestUpdateManyAndReturnArgs} args - Arguments to update many ProductRequests.
     * @example
     * // Update many ProductRequests
     * const productRequest = await prisma.productRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductRequests and only return the `id`
     * const productRequestWithIdOnly = await prisma.productRequest.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProductRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductRequest.
     * @param {ProductRequestUpsertArgs} args - Arguments to update or create a ProductRequest.
     * @example
     * // Update or create a ProductRequest
     * const productRequest = await prisma.productRequest.upsert({
     *   create: {
     *     // ... data to create a ProductRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductRequest we want to update
     *   }
     * })
     */
    upsert<T extends ProductRequestUpsertArgs>(args: SelectSubset<T, ProductRequestUpsertArgs<ExtArgs>>): Prisma__ProductRequestClient<$Result.GetResult<Prisma.$ProductRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductRequestCountArgs} args - Arguments to filter ProductRequests to count.
     * @example
     * // Count the number of ProductRequests
     * const count = await prisma.productRequest.count({
     *   where: {
     *     // ... the filter for the ProductRequests we want to count
     *   }
     * })
    **/
    count<T extends ProductRequestCountArgs>(
      args?: Subset<T, ProductRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductRequestAggregateArgs>(args: Subset<T, ProductRequestAggregateArgs>): Prisma.PrismaPromise<GetProductRequestAggregateType<T>>

    /**
     * Group by ProductRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductRequestGroupByArgs} args - Group by arguments.
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
      T extends ProductRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductRequestGroupByArgs['orderBy'] }
        : { orderBy?: ProductRequestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductRequest model
   */
  readonly fields: ProductRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the ProductRequest model
   */
  interface ProductRequestFieldRefs {
    readonly id: FieldRef<"ProductRequest", 'String'>
    readonly name: FieldRef<"ProductRequest", 'String'>
    readonly productName: FieldRef<"ProductRequest", 'String'>
    readonly reason: FieldRef<"ProductRequest", 'String'>
    readonly status: FieldRef<"ProductRequest", 'ProductRequestStatus'>
    readonly isRead: FieldRef<"ProductRequest", 'Boolean'>
    readonly createdAt: FieldRef<"ProductRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"ProductRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductRequest findUnique
   */
  export type ProductRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRequest
     */
    select?: ProductRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRequest
     */
    omit?: ProductRequestOmit<ExtArgs> | null
    /**
     * Filter, which ProductRequest to fetch.
     */
    where: ProductRequestWhereUniqueInput
  }

  /**
   * ProductRequest findUniqueOrThrow
   */
  export type ProductRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRequest
     */
    select?: ProductRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRequest
     */
    omit?: ProductRequestOmit<ExtArgs> | null
    /**
     * Filter, which ProductRequest to fetch.
     */
    where: ProductRequestWhereUniqueInput
  }

  /**
   * ProductRequest findFirst
   */
  export type ProductRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRequest
     */
    select?: ProductRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRequest
     */
    omit?: ProductRequestOmit<ExtArgs> | null
    /**
     * Filter, which ProductRequest to fetch.
     */
    where?: ProductRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductRequests to fetch.
     */
    orderBy?: ProductRequestOrderByWithRelationInput | ProductRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductRequests.
     */
    cursor?: ProductRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductRequests.
     */
    distinct?: ProductRequestScalarFieldEnum | ProductRequestScalarFieldEnum[]
  }

  /**
   * ProductRequest findFirstOrThrow
   */
  export type ProductRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRequest
     */
    select?: ProductRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRequest
     */
    omit?: ProductRequestOmit<ExtArgs> | null
    /**
     * Filter, which ProductRequest to fetch.
     */
    where?: ProductRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductRequests to fetch.
     */
    orderBy?: ProductRequestOrderByWithRelationInput | ProductRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductRequests.
     */
    cursor?: ProductRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductRequests.
     */
    distinct?: ProductRequestScalarFieldEnum | ProductRequestScalarFieldEnum[]
  }

  /**
   * ProductRequest findMany
   */
  export type ProductRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRequest
     */
    select?: ProductRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRequest
     */
    omit?: ProductRequestOmit<ExtArgs> | null
    /**
     * Filter, which ProductRequests to fetch.
     */
    where?: ProductRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductRequests to fetch.
     */
    orderBy?: ProductRequestOrderByWithRelationInput | ProductRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductRequests.
     */
    cursor?: ProductRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductRequests.
     */
    distinct?: ProductRequestScalarFieldEnum | ProductRequestScalarFieldEnum[]
  }

  /**
   * ProductRequest create
   */
  export type ProductRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRequest
     */
    select?: ProductRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRequest
     */
    omit?: ProductRequestOmit<ExtArgs> | null
    /**
     * The data needed to create a ProductRequest.
     */
    data: XOR<ProductRequestCreateInput, ProductRequestUncheckedCreateInput>
  }

  /**
   * ProductRequest createMany
   */
  export type ProductRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductRequests.
     */
    data: ProductRequestCreateManyInput | ProductRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductRequest createManyAndReturn
   */
  export type ProductRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRequest
     */
    select?: ProductRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRequest
     */
    omit?: ProductRequestOmit<ExtArgs> | null
    /**
     * The data used to create many ProductRequests.
     */
    data: ProductRequestCreateManyInput | ProductRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductRequest update
   */
  export type ProductRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRequest
     */
    select?: ProductRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRequest
     */
    omit?: ProductRequestOmit<ExtArgs> | null
    /**
     * The data needed to update a ProductRequest.
     */
    data: XOR<ProductRequestUpdateInput, ProductRequestUncheckedUpdateInput>
    /**
     * Choose, which ProductRequest to update.
     */
    where: ProductRequestWhereUniqueInput
  }

  /**
   * ProductRequest updateMany
   */
  export type ProductRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductRequests.
     */
    data: XOR<ProductRequestUpdateManyMutationInput, ProductRequestUncheckedUpdateManyInput>
    /**
     * Filter which ProductRequests to update
     */
    where?: ProductRequestWhereInput
    /**
     * Limit how many ProductRequests to update.
     */
    limit?: number
  }

  /**
   * ProductRequest updateManyAndReturn
   */
  export type ProductRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRequest
     */
    select?: ProductRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRequest
     */
    omit?: ProductRequestOmit<ExtArgs> | null
    /**
     * The data used to update ProductRequests.
     */
    data: XOR<ProductRequestUpdateManyMutationInput, ProductRequestUncheckedUpdateManyInput>
    /**
     * Filter which ProductRequests to update
     */
    where?: ProductRequestWhereInput
    /**
     * Limit how many ProductRequests to update.
     */
    limit?: number
  }

  /**
   * ProductRequest upsert
   */
  export type ProductRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRequest
     */
    select?: ProductRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRequest
     */
    omit?: ProductRequestOmit<ExtArgs> | null
    /**
     * The filter to search for the ProductRequest to update in case it exists.
     */
    where: ProductRequestWhereUniqueInput
    /**
     * In case the ProductRequest found by the `where` argument doesn't exist, create a new ProductRequest with this data.
     */
    create: XOR<ProductRequestCreateInput, ProductRequestUncheckedCreateInput>
    /**
     * In case the ProductRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductRequestUpdateInput, ProductRequestUncheckedUpdateInput>
  }

  /**
   * ProductRequest delete
   */
  export type ProductRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRequest
     */
    select?: ProductRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRequest
     */
    omit?: ProductRequestOmit<ExtArgs> | null
    /**
     * Filter which ProductRequest to delete.
     */
    where: ProductRequestWhereUniqueInput
  }

  /**
   * ProductRequest deleteMany
   */
  export type ProductRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductRequests to delete
     */
    where?: ProductRequestWhereInput
    /**
     * Limit how many ProductRequests to delete.
     */
    limit?: number
  }

  /**
   * ProductRequest without action
   */
  export type ProductRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductRequest
     */
    select?: ProductRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductRequest
     */
    omit?: ProductRequestOmit<ExtArgs> | null
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
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    description: 'description',
    category: 'category',
    sku: 'sku',
    price: 'price',
    quantity: 'quantity',
    lowStock: 'lowStock',
    dosage: 'dosage',
    dosageGuide: 'dosageGuide',
    manufacturer: 'manufacturer',
    expiryDate: 'expiryDate',
    imageUrl: 'imageUrl',
    prescriptionRequired: 'prescriptionRequired',
    activeListing: 'activeListing',
    isFeatured: 'isFeatured',
    featuredRank: 'featuredRank',
    createAt: 'createAt',
    updateAt: 'updateAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    reference: 'reference',
    idempotencyKey: 'idempotencyKey',
    sellerId: 'sellerId',
    email: 'email',
    amount: 'amount',
    currency: 'currency',
    status: 'status',
    paidAt: 'paidAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    fulfillmentStatus: 'fulfillmentStatus',
    customerName: 'customerName',
    customerPhone: 'customerPhone',
    customerAddress: 'customerAddress',
    riderId: 'riderId',
    riderName: 'riderName',
    riderPhone: 'riderPhone',
    assignedAt: 'assignedAt',
    pickedUpAt: 'pickedUpAt',
    deliveredAt: 'deliveredAt',
    estimatedTime: 'estimatedTime',
    adminNotes: 'adminNotes',
    notificationSent: 'notificationSent'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const OrderStatusLogScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    status: 'status',
    note: 'note',
    createdAt: 'createdAt'
  };

  export type OrderStatusLogScalarFieldEnum = (typeof OrderStatusLogScalarFieldEnum)[keyof typeof OrderStatusLogScalarFieldEnum]


  export const RiderScalarFieldEnum: {
    id: 'id',
    name: 'name',
    phone: 'phone',
    whatsapp: 'whatsapp',
    isActive: 'isActive',
    createdAt: 'createdAt'
  };

  export type RiderScalarFieldEnum = (typeof RiderScalarFieldEnum)[keyof typeof RiderScalarFieldEnum]


  export const OrderItemScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    productId: 'productId',
    name: 'name',
    unitPrice: 'unitPrice',
    quantity: 'quantity',
    lineTotal: 'lineTotal',
    imageUrl: 'imageUrl',
    category: 'category'
  };

  export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum]


  export const PaymentTransactionScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    reference: 'reference',
    provider: 'provider',
    providerReference: 'providerReference',
    authorizationUrl: 'authorizationUrl',
    accessCode: 'accessCode',
    status: 'status',
    amount: 'amount',
    currency: 'currency',
    paidAt: 'paidAt',
    rawPayload: 'rawPayload',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentTransactionScalarFieldEnum = (typeof PaymentTransactionScalarFieldEnum)[keyof typeof PaymentTransactionScalarFieldEnum]


  export const HeroSlideScalarFieldEnum: {
    id: 'id',
    title: 'title',
    subtitle: 'subtitle',
    imageUrl: 'imageUrl',
    ctaText: 'ctaText',
    ctaUrl: 'ctaUrl',
    active: 'active',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HeroSlideScalarFieldEnum = (typeof HeroSlideScalarFieldEnum)[keyof typeof HeroSlideScalarFieldEnum]


  export const SupportConversationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    guestName: 'guestName',
    guestPhone: 'guestPhone',
    status: 'status',
    subject: 'subject',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastMessageAt: 'lastMessageAt',
    pharmacistId: 'pharmacistId',
    isRead: 'isRead'
  };

  export type SupportConversationScalarFieldEnum = (typeof SupportConversationScalarFieldEnum)[keyof typeof SupportConversationScalarFieldEnum]


  export const SupportMessageScalarFieldEnum: {
    id: 'id',
    conversationId: 'conversationId',
    content: 'content',
    senderType: 'senderType',
    senderName: 'senderName',
    createdAt: 'createdAt',
    isRead: 'isRead',
    messageType: 'messageType',
    productId: 'productId',
    productName: 'productName',
    productPrice: 'productPrice',
    productImage: 'productImage'
  };

  export type SupportMessageScalarFieldEnum = (typeof SupportMessageScalarFieldEnum)[keyof typeof SupportMessageScalarFieldEnum]


  export const CustomerReviewScalarFieldEnum: {
    id: 'id',
    name: 'name',
    rating: 'rating',
    message: 'message',
    isApproved: 'isApproved',
    isRead: 'isRead',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerReviewScalarFieldEnum = (typeof CustomerReviewScalarFieldEnum)[keyof typeof CustomerReviewScalarFieldEnum]


  export const ProductRequestScalarFieldEnum: {
    id: 'id',
    name: 'name',
    productName: 'productName',
    reason: 'reason',
    status: 'status',
    isRead: 'isRead',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductRequestScalarFieldEnum = (typeof ProductRequestScalarFieldEnum)[keyof typeof ProductRequestScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>
    


  /**
   * Reference to a field of type 'ConversationStatus'
   */
  export type EnumConversationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConversationStatus'>
    


  /**
   * Reference to a field of type 'ConversationStatus[]'
   */
  export type ListEnumConversationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConversationStatus[]'>
    


  /**
   * Reference to a field of type 'SenderType'
   */
  export type EnumSenderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SenderType'>
    


  /**
   * Reference to a field of type 'SenderType[]'
   */
  export type ListEnumSenderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SenderType[]'>
    


  /**
   * Reference to a field of type 'MessageType'
   */
  export type EnumMessageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageType'>
    


  /**
   * Reference to a field of type 'MessageType[]'
   */
  export type ListEnumMessageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'ProductRequestStatus'
   */
  export type EnumProductRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductRequestStatus'>
    


  /**
   * Reference to a field of type 'ProductRequestStatus[]'
   */
  export type ListEnumProductRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductRequestStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
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
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    userId?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    category?: StringNullableFilter<"Product"> | string | null
    sku?: StringNullableFilter<"Product"> | string | null
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    quantity?: IntFilter<"Product"> | number
    lowStock?: IntNullableFilter<"Product"> | number | null
    dosage?: StringNullableFilter<"Product"> | string | null
    dosageGuide?: JsonNullableFilter<"Product">
    manufacturer?: StringNullableFilter<"Product"> | string | null
    expiryDate?: DateTimeNullableFilter<"Product"> | Date | string | null
    imageUrl?: StringNullableFilter<"Product"> | string | null
    prescriptionRequired?: BoolFilter<"Product"> | boolean
    activeListing?: BoolFilter<"Product"> | boolean
    isFeatured?: BoolFilter<"Product"> | boolean
    featuredRank?: IntNullableFilter<"Product"> | number | null
    createAt?: DateTimeFilter<"Product"> | Date | string
    updateAt?: DateTimeFilter<"Product"> | Date | string
    orderItems?: OrderItemListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    sku?: SortOrderInput | SortOrder
    price?: SortOrder
    quantity?: SortOrder
    lowStock?: SortOrderInput | SortOrder
    dosage?: SortOrderInput | SortOrder
    dosageGuide?: SortOrderInput | SortOrder
    manufacturer?: SortOrderInput | SortOrder
    expiryDate?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    prescriptionRequired?: SortOrder
    activeListing?: SortOrder
    isFeatured?: SortOrder
    featuredRank?: SortOrderInput | SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    orderItems?: OrderItemOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sku?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    userId?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    category?: StringNullableFilter<"Product"> | string | null
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    quantity?: IntFilter<"Product"> | number
    lowStock?: IntNullableFilter<"Product"> | number | null
    dosage?: StringNullableFilter<"Product"> | string | null
    dosageGuide?: JsonNullableFilter<"Product">
    manufacturer?: StringNullableFilter<"Product"> | string | null
    expiryDate?: DateTimeNullableFilter<"Product"> | Date | string | null
    imageUrl?: StringNullableFilter<"Product"> | string | null
    prescriptionRequired?: BoolFilter<"Product"> | boolean
    activeListing?: BoolFilter<"Product"> | boolean
    isFeatured?: BoolFilter<"Product"> | boolean
    featuredRank?: IntNullableFilter<"Product"> | number | null
    createAt?: DateTimeFilter<"Product"> | Date | string
    updateAt?: DateTimeFilter<"Product"> | Date | string
    orderItems?: OrderItemListRelationFilter
  }, "id" | "sku">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    sku?: SortOrderInput | SortOrder
    price?: SortOrder
    quantity?: SortOrder
    lowStock?: SortOrderInput | SortOrder
    dosage?: SortOrderInput | SortOrder
    dosageGuide?: SortOrderInput | SortOrder
    manufacturer?: SortOrderInput | SortOrder
    expiryDate?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    prescriptionRequired?: SortOrder
    activeListing?: SortOrder
    isFeatured?: SortOrder
    featuredRank?: SortOrderInput | SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    userId?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    category?: StringNullableWithAggregatesFilter<"Product"> | string | null
    sku?: StringNullableWithAggregatesFilter<"Product"> | string | null
    price?: DecimalWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string
    quantity?: IntWithAggregatesFilter<"Product"> | number
    lowStock?: IntNullableWithAggregatesFilter<"Product"> | number | null
    dosage?: StringNullableWithAggregatesFilter<"Product"> | string | null
    dosageGuide?: JsonNullableWithAggregatesFilter<"Product">
    manufacturer?: StringNullableWithAggregatesFilter<"Product"> | string | null
    expiryDate?: DateTimeNullableWithAggregatesFilter<"Product"> | Date | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Product"> | string | null
    prescriptionRequired?: BoolWithAggregatesFilter<"Product"> | boolean
    activeListing?: BoolWithAggregatesFilter<"Product"> | boolean
    isFeatured?: BoolWithAggregatesFilter<"Product"> | boolean
    featuredRank?: IntNullableWithAggregatesFilter<"Product"> | number | null
    createAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updateAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    reference?: StringFilter<"Order"> | string
    idempotencyKey?: StringNullableFilter<"Order"> | string | null
    sellerId?: StringNullableFilter<"Order"> | string | null
    email?: StringFilter<"Order"> | string
    amount?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Order"> | string
    status?: StringFilter<"Order"> | string
    paidAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    fulfillmentStatus?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    customerName?: StringNullableFilter<"Order"> | string | null
    customerPhone?: StringNullableFilter<"Order"> | string | null
    customerAddress?: StringNullableFilter<"Order"> | string | null
    riderId?: StringNullableFilter<"Order"> | string | null
    riderName?: StringNullableFilter<"Order"> | string | null
    riderPhone?: StringNullableFilter<"Order"> | string | null
    assignedAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    pickedUpAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    deliveredAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    estimatedTime?: IntNullableFilter<"Order"> | number | null
    adminNotes?: StringNullableFilter<"Order"> | string | null
    notificationSent?: BoolFilter<"Order"> | boolean
    items?: OrderItemListRelationFilter
    payment?: XOR<PaymentTransactionNullableScalarRelationFilter, PaymentTransactionWhereInput> | null
    statusHistory?: OrderStatusLogListRelationFilter
    rider?: XOR<RiderNullableScalarRelationFilter, RiderWhereInput> | null
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    reference?: SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    sellerId?: SortOrderInput | SortOrder
    email?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fulfillmentStatus?: SortOrder
    customerName?: SortOrderInput | SortOrder
    customerPhone?: SortOrderInput | SortOrder
    customerAddress?: SortOrderInput | SortOrder
    riderId?: SortOrderInput | SortOrder
    riderName?: SortOrderInput | SortOrder
    riderPhone?: SortOrderInput | SortOrder
    assignedAt?: SortOrderInput | SortOrder
    pickedUpAt?: SortOrderInput | SortOrder
    deliveredAt?: SortOrderInput | SortOrder
    estimatedTime?: SortOrderInput | SortOrder
    adminNotes?: SortOrderInput | SortOrder
    notificationSent?: SortOrder
    items?: OrderItemOrderByRelationAggregateInput
    payment?: PaymentTransactionOrderByWithRelationInput
    statusHistory?: OrderStatusLogOrderByRelationAggregateInput
    rider?: RiderOrderByWithRelationInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    reference?: string
    idempotencyKey?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    sellerId?: StringNullableFilter<"Order"> | string | null
    email?: StringFilter<"Order"> | string
    amount?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Order"> | string
    status?: StringFilter<"Order"> | string
    paidAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    fulfillmentStatus?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    customerName?: StringNullableFilter<"Order"> | string | null
    customerPhone?: StringNullableFilter<"Order"> | string | null
    customerAddress?: StringNullableFilter<"Order"> | string | null
    riderId?: StringNullableFilter<"Order"> | string | null
    riderName?: StringNullableFilter<"Order"> | string | null
    riderPhone?: StringNullableFilter<"Order"> | string | null
    assignedAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    pickedUpAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    deliveredAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    estimatedTime?: IntNullableFilter<"Order"> | number | null
    adminNotes?: StringNullableFilter<"Order"> | string | null
    notificationSent?: BoolFilter<"Order"> | boolean
    items?: OrderItemListRelationFilter
    payment?: XOR<PaymentTransactionNullableScalarRelationFilter, PaymentTransactionWhereInput> | null
    statusHistory?: OrderStatusLogListRelationFilter
    rider?: XOR<RiderNullableScalarRelationFilter, RiderWhereInput> | null
  }, "id" | "reference" | "idempotencyKey">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    reference?: SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    sellerId?: SortOrderInput | SortOrder
    email?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fulfillmentStatus?: SortOrder
    customerName?: SortOrderInput | SortOrder
    customerPhone?: SortOrderInput | SortOrder
    customerAddress?: SortOrderInput | SortOrder
    riderId?: SortOrderInput | SortOrder
    riderName?: SortOrderInput | SortOrder
    riderPhone?: SortOrderInput | SortOrder
    assignedAt?: SortOrderInput | SortOrder
    pickedUpAt?: SortOrderInput | SortOrder
    deliveredAt?: SortOrderInput | SortOrder
    estimatedTime?: SortOrderInput | SortOrder
    adminNotes?: SortOrderInput | SortOrder
    notificationSent?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    reference?: StringWithAggregatesFilter<"Order"> | string
    idempotencyKey?: StringNullableWithAggregatesFilter<"Order"> | string | null
    sellerId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    email?: StringWithAggregatesFilter<"Order"> | string
    amount?: DecimalWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string
    currency?: StringWithAggregatesFilter<"Order"> | string
    status?: StringWithAggregatesFilter<"Order"> | string
    paidAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    fulfillmentStatus?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus
    customerName?: StringNullableWithAggregatesFilter<"Order"> | string | null
    customerPhone?: StringNullableWithAggregatesFilter<"Order"> | string | null
    customerAddress?: StringNullableWithAggregatesFilter<"Order"> | string | null
    riderId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    riderName?: StringNullableWithAggregatesFilter<"Order"> | string | null
    riderPhone?: StringNullableWithAggregatesFilter<"Order"> | string | null
    assignedAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    pickedUpAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    deliveredAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    estimatedTime?: IntNullableWithAggregatesFilter<"Order"> | number | null
    adminNotes?: StringNullableWithAggregatesFilter<"Order"> | string | null
    notificationSent?: BoolWithAggregatesFilter<"Order"> | boolean
  }

  export type OrderStatusLogWhereInput = {
    AND?: OrderStatusLogWhereInput | OrderStatusLogWhereInput[]
    OR?: OrderStatusLogWhereInput[]
    NOT?: OrderStatusLogWhereInput | OrderStatusLogWhereInput[]
    id?: StringFilter<"OrderStatusLog"> | string
    orderId?: StringFilter<"OrderStatusLog"> | string
    status?: EnumOrderStatusFilter<"OrderStatusLog"> | $Enums.OrderStatus
    note?: StringNullableFilter<"OrderStatusLog"> | string | null
    createdAt?: DateTimeFilter<"OrderStatusLog"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type OrderStatusLogOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    order?: OrderOrderByWithRelationInput
  }

  export type OrderStatusLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderStatusLogWhereInput | OrderStatusLogWhereInput[]
    OR?: OrderStatusLogWhereInput[]
    NOT?: OrderStatusLogWhereInput | OrderStatusLogWhereInput[]
    orderId?: StringFilter<"OrderStatusLog"> | string
    status?: EnumOrderStatusFilter<"OrderStatusLog"> | $Enums.OrderStatus
    note?: StringNullableFilter<"OrderStatusLog"> | string | null
    createdAt?: DateTimeFilter<"OrderStatusLog"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "id">

  export type OrderStatusLogOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: OrderStatusLogCountOrderByAggregateInput
    _max?: OrderStatusLogMaxOrderByAggregateInput
    _min?: OrderStatusLogMinOrderByAggregateInput
  }

  export type OrderStatusLogScalarWhereWithAggregatesInput = {
    AND?: OrderStatusLogScalarWhereWithAggregatesInput | OrderStatusLogScalarWhereWithAggregatesInput[]
    OR?: OrderStatusLogScalarWhereWithAggregatesInput[]
    NOT?: OrderStatusLogScalarWhereWithAggregatesInput | OrderStatusLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderStatusLog"> | string
    orderId?: StringWithAggregatesFilter<"OrderStatusLog"> | string
    status?: EnumOrderStatusWithAggregatesFilter<"OrderStatusLog"> | $Enums.OrderStatus
    note?: StringNullableWithAggregatesFilter<"OrderStatusLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OrderStatusLog"> | Date | string
  }

  export type RiderWhereInput = {
    AND?: RiderWhereInput | RiderWhereInput[]
    OR?: RiderWhereInput[]
    NOT?: RiderWhereInput | RiderWhereInput[]
    id?: StringFilter<"Rider"> | string
    name?: StringFilter<"Rider"> | string
    phone?: StringFilter<"Rider"> | string
    whatsapp?: StringFilter<"Rider"> | string
    isActive?: BoolFilter<"Rider"> | boolean
    createdAt?: DateTimeFilter<"Rider"> | Date | string
    orders?: OrderListRelationFilter
  }

  export type RiderOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    whatsapp?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    orders?: OrderOrderByRelationAggregateInput
  }

  export type RiderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RiderWhereInput | RiderWhereInput[]
    OR?: RiderWhereInput[]
    NOT?: RiderWhereInput | RiderWhereInput[]
    name?: StringFilter<"Rider"> | string
    phone?: StringFilter<"Rider"> | string
    whatsapp?: StringFilter<"Rider"> | string
    isActive?: BoolFilter<"Rider"> | boolean
    createdAt?: DateTimeFilter<"Rider"> | Date | string
    orders?: OrderListRelationFilter
  }, "id">

  export type RiderOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    whatsapp?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: RiderCountOrderByAggregateInput
    _max?: RiderMaxOrderByAggregateInput
    _min?: RiderMinOrderByAggregateInput
  }

  export type RiderScalarWhereWithAggregatesInput = {
    AND?: RiderScalarWhereWithAggregatesInput | RiderScalarWhereWithAggregatesInput[]
    OR?: RiderScalarWhereWithAggregatesInput[]
    NOT?: RiderScalarWhereWithAggregatesInput | RiderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Rider"> | string
    name?: StringWithAggregatesFilter<"Rider"> | string
    phone?: StringWithAggregatesFilter<"Rider"> | string
    whatsapp?: StringWithAggregatesFilter<"Rider"> | string
    isActive?: BoolWithAggregatesFilter<"Rider"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Rider"> | Date | string
  }

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    name?: StringFilter<"OrderItem"> | string
    unitPrice?: DecimalFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    quantity?: IntFilter<"OrderItem"> | number
    lineTotal?: DecimalFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    imageUrl?: StringNullableFilter<"OrderItem"> | string | null
    category?: StringNullableFilter<"OrderItem"> | string | null
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type OrderItemOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    lineTotal?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    order?: OrderOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    name?: StringFilter<"OrderItem"> | string
    unitPrice?: DecimalFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    quantity?: IntFilter<"OrderItem"> | number
    lineTotal?: DecimalFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    imageUrl?: StringNullableFilter<"OrderItem"> | string | null
    category?: StringNullableFilter<"OrderItem"> | string | null
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id">

  export type OrderItemOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    lineTotal?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    _count?: OrderItemCountOrderByAggregateInput
    _avg?: OrderItemAvgOrderByAggregateInput
    _max?: OrderItemMaxOrderByAggregateInput
    _min?: OrderItemMinOrderByAggregateInput
    _sum?: OrderItemSumOrderByAggregateInput
  }

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    OR?: OrderItemScalarWhereWithAggregatesInput[]
    NOT?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderItem"> | string
    orderId?: StringWithAggregatesFilter<"OrderItem"> | string
    productId?: StringWithAggregatesFilter<"OrderItem"> | string
    name?: StringWithAggregatesFilter<"OrderItem"> | string
    unitPrice?: DecimalWithAggregatesFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    quantity?: IntWithAggregatesFilter<"OrderItem"> | number
    lineTotal?: DecimalWithAggregatesFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    imageUrl?: StringNullableWithAggregatesFilter<"OrderItem"> | string | null
    category?: StringNullableWithAggregatesFilter<"OrderItem"> | string | null
  }

  export type PaymentTransactionWhereInput = {
    AND?: PaymentTransactionWhereInput | PaymentTransactionWhereInput[]
    OR?: PaymentTransactionWhereInput[]
    NOT?: PaymentTransactionWhereInput | PaymentTransactionWhereInput[]
    id?: StringFilter<"PaymentTransaction"> | string
    orderId?: StringFilter<"PaymentTransaction"> | string
    reference?: StringFilter<"PaymentTransaction"> | string
    provider?: StringFilter<"PaymentTransaction"> | string
    providerReference?: StringNullableFilter<"PaymentTransaction"> | string | null
    authorizationUrl?: StringNullableFilter<"PaymentTransaction"> | string | null
    accessCode?: StringNullableFilter<"PaymentTransaction"> | string | null
    status?: StringFilter<"PaymentTransaction"> | string
    amount?: DecimalFilter<"PaymentTransaction"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"PaymentTransaction"> | string
    paidAt?: DateTimeNullableFilter<"PaymentTransaction"> | Date | string | null
    rawPayload?: JsonNullableFilter<"PaymentTransaction">
    createdAt?: DateTimeFilter<"PaymentTransaction"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentTransaction"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type PaymentTransactionOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    reference?: SortOrder
    provider?: SortOrder
    providerReference?: SortOrderInput | SortOrder
    authorizationUrl?: SortOrderInput | SortOrder
    accessCode?: SortOrderInput | SortOrder
    status?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    rawPayload?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    order?: OrderOrderByWithRelationInput
  }

  export type PaymentTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orderId?: string
    reference?: string
    AND?: PaymentTransactionWhereInput | PaymentTransactionWhereInput[]
    OR?: PaymentTransactionWhereInput[]
    NOT?: PaymentTransactionWhereInput | PaymentTransactionWhereInput[]
    provider?: StringFilter<"PaymentTransaction"> | string
    providerReference?: StringNullableFilter<"PaymentTransaction"> | string | null
    authorizationUrl?: StringNullableFilter<"PaymentTransaction"> | string | null
    accessCode?: StringNullableFilter<"PaymentTransaction"> | string | null
    status?: StringFilter<"PaymentTransaction"> | string
    amount?: DecimalFilter<"PaymentTransaction"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"PaymentTransaction"> | string
    paidAt?: DateTimeNullableFilter<"PaymentTransaction"> | Date | string | null
    rawPayload?: JsonNullableFilter<"PaymentTransaction">
    createdAt?: DateTimeFilter<"PaymentTransaction"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentTransaction"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "id" | "orderId" | "reference">

  export type PaymentTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    reference?: SortOrder
    provider?: SortOrder
    providerReference?: SortOrderInput | SortOrder
    authorizationUrl?: SortOrderInput | SortOrder
    accessCode?: SortOrderInput | SortOrder
    status?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    rawPayload?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentTransactionCountOrderByAggregateInput
    _avg?: PaymentTransactionAvgOrderByAggregateInput
    _max?: PaymentTransactionMaxOrderByAggregateInput
    _min?: PaymentTransactionMinOrderByAggregateInput
    _sum?: PaymentTransactionSumOrderByAggregateInput
  }

  export type PaymentTransactionScalarWhereWithAggregatesInput = {
    AND?: PaymentTransactionScalarWhereWithAggregatesInput | PaymentTransactionScalarWhereWithAggregatesInput[]
    OR?: PaymentTransactionScalarWhereWithAggregatesInput[]
    NOT?: PaymentTransactionScalarWhereWithAggregatesInput | PaymentTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PaymentTransaction"> | string
    orderId?: StringWithAggregatesFilter<"PaymentTransaction"> | string
    reference?: StringWithAggregatesFilter<"PaymentTransaction"> | string
    provider?: StringWithAggregatesFilter<"PaymentTransaction"> | string
    providerReference?: StringNullableWithAggregatesFilter<"PaymentTransaction"> | string | null
    authorizationUrl?: StringNullableWithAggregatesFilter<"PaymentTransaction"> | string | null
    accessCode?: StringNullableWithAggregatesFilter<"PaymentTransaction"> | string | null
    status?: StringWithAggregatesFilter<"PaymentTransaction"> | string
    amount?: DecimalWithAggregatesFilter<"PaymentTransaction"> | Decimal | DecimalJsLike | number | string
    currency?: StringWithAggregatesFilter<"PaymentTransaction"> | string
    paidAt?: DateTimeNullableWithAggregatesFilter<"PaymentTransaction"> | Date | string | null
    rawPayload?: JsonNullableWithAggregatesFilter<"PaymentTransaction">
    createdAt?: DateTimeWithAggregatesFilter<"PaymentTransaction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PaymentTransaction"> | Date | string
  }

  export type HeroSlideWhereInput = {
    AND?: HeroSlideWhereInput | HeroSlideWhereInput[]
    OR?: HeroSlideWhereInput[]
    NOT?: HeroSlideWhereInput | HeroSlideWhereInput[]
    id?: StringFilter<"HeroSlide"> | string
    title?: StringFilter<"HeroSlide"> | string
    subtitle?: StringNullableFilter<"HeroSlide"> | string | null
    imageUrl?: StringFilter<"HeroSlide"> | string
    ctaText?: StringNullableFilter<"HeroSlide"> | string | null
    ctaUrl?: StringNullableFilter<"HeroSlide"> | string | null
    active?: BoolFilter<"HeroSlide"> | boolean
    sortOrder?: IntFilter<"HeroSlide"> | number
    createdAt?: DateTimeFilter<"HeroSlide"> | Date | string
    updatedAt?: DateTimeFilter<"HeroSlide"> | Date | string
  }

  export type HeroSlideOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    subtitle?: SortOrderInput | SortOrder
    imageUrl?: SortOrder
    ctaText?: SortOrderInput | SortOrder
    ctaUrl?: SortOrderInput | SortOrder
    active?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HeroSlideWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HeroSlideWhereInput | HeroSlideWhereInput[]
    OR?: HeroSlideWhereInput[]
    NOT?: HeroSlideWhereInput | HeroSlideWhereInput[]
    title?: StringFilter<"HeroSlide"> | string
    subtitle?: StringNullableFilter<"HeroSlide"> | string | null
    imageUrl?: StringFilter<"HeroSlide"> | string
    ctaText?: StringNullableFilter<"HeroSlide"> | string | null
    ctaUrl?: StringNullableFilter<"HeroSlide"> | string | null
    active?: BoolFilter<"HeroSlide"> | boolean
    sortOrder?: IntFilter<"HeroSlide"> | number
    createdAt?: DateTimeFilter<"HeroSlide"> | Date | string
    updatedAt?: DateTimeFilter<"HeroSlide"> | Date | string
  }, "id">

  export type HeroSlideOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    subtitle?: SortOrderInput | SortOrder
    imageUrl?: SortOrder
    ctaText?: SortOrderInput | SortOrder
    ctaUrl?: SortOrderInput | SortOrder
    active?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HeroSlideCountOrderByAggregateInput
    _avg?: HeroSlideAvgOrderByAggregateInput
    _max?: HeroSlideMaxOrderByAggregateInput
    _min?: HeroSlideMinOrderByAggregateInput
    _sum?: HeroSlideSumOrderByAggregateInput
  }

  export type HeroSlideScalarWhereWithAggregatesInput = {
    AND?: HeroSlideScalarWhereWithAggregatesInput | HeroSlideScalarWhereWithAggregatesInput[]
    OR?: HeroSlideScalarWhereWithAggregatesInput[]
    NOT?: HeroSlideScalarWhereWithAggregatesInput | HeroSlideScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HeroSlide"> | string
    title?: StringWithAggregatesFilter<"HeroSlide"> | string
    subtitle?: StringNullableWithAggregatesFilter<"HeroSlide"> | string | null
    imageUrl?: StringWithAggregatesFilter<"HeroSlide"> | string
    ctaText?: StringNullableWithAggregatesFilter<"HeroSlide"> | string | null
    ctaUrl?: StringNullableWithAggregatesFilter<"HeroSlide"> | string | null
    active?: BoolWithAggregatesFilter<"HeroSlide"> | boolean
    sortOrder?: IntWithAggregatesFilter<"HeroSlide"> | number
    createdAt?: DateTimeWithAggregatesFilter<"HeroSlide"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"HeroSlide"> | Date | string
  }

  export type SupportConversationWhereInput = {
    AND?: SupportConversationWhereInput | SupportConversationWhereInput[]
    OR?: SupportConversationWhereInput[]
    NOT?: SupportConversationWhereInput | SupportConversationWhereInput[]
    id?: StringFilter<"SupportConversation"> | string
    userId?: StringNullableFilter<"SupportConversation"> | string | null
    guestName?: StringNullableFilter<"SupportConversation"> | string | null
    guestPhone?: StringNullableFilter<"SupportConversation"> | string | null
    status?: EnumConversationStatusFilter<"SupportConversation"> | $Enums.ConversationStatus
    subject?: StringNullableFilter<"SupportConversation"> | string | null
    createdAt?: DateTimeFilter<"SupportConversation"> | Date | string
    updatedAt?: DateTimeFilter<"SupportConversation"> | Date | string
    lastMessageAt?: DateTimeFilter<"SupportConversation"> | Date | string
    pharmacistId?: StringNullableFilter<"SupportConversation"> | string | null
    isRead?: BoolFilter<"SupportConversation"> | boolean
    messages?: SupportMessageListRelationFilter
  }

  export type SupportConversationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    guestName?: SortOrderInput | SortOrder
    guestPhone?: SortOrderInput | SortOrder
    status?: SortOrder
    subject?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastMessageAt?: SortOrder
    pharmacistId?: SortOrderInput | SortOrder
    isRead?: SortOrder
    messages?: SupportMessageOrderByRelationAggregateInput
  }

  export type SupportConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SupportConversationWhereInput | SupportConversationWhereInput[]
    OR?: SupportConversationWhereInput[]
    NOT?: SupportConversationWhereInput | SupportConversationWhereInput[]
    userId?: StringNullableFilter<"SupportConversation"> | string | null
    guestName?: StringNullableFilter<"SupportConversation"> | string | null
    guestPhone?: StringNullableFilter<"SupportConversation"> | string | null
    status?: EnumConversationStatusFilter<"SupportConversation"> | $Enums.ConversationStatus
    subject?: StringNullableFilter<"SupportConversation"> | string | null
    createdAt?: DateTimeFilter<"SupportConversation"> | Date | string
    updatedAt?: DateTimeFilter<"SupportConversation"> | Date | string
    lastMessageAt?: DateTimeFilter<"SupportConversation"> | Date | string
    pharmacistId?: StringNullableFilter<"SupportConversation"> | string | null
    isRead?: BoolFilter<"SupportConversation"> | boolean
    messages?: SupportMessageListRelationFilter
  }, "id">

  export type SupportConversationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    guestName?: SortOrderInput | SortOrder
    guestPhone?: SortOrderInput | SortOrder
    status?: SortOrder
    subject?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastMessageAt?: SortOrder
    pharmacistId?: SortOrderInput | SortOrder
    isRead?: SortOrder
    _count?: SupportConversationCountOrderByAggregateInput
    _max?: SupportConversationMaxOrderByAggregateInput
    _min?: SupportConversationMinOrderByAggregateInput
  }

  export type SupportConversationScalarWhereWithAggregatesInput = {
    AND?: SupportConversationScalarWhereWithAggregatesInput | SupportConversationScalarWhereWithAggregatesInput[]
    OR?: SupportConversationScalarWhereWithAggregatesInput[]
    NOT?: SupportConversationScalarWhereWithAggregatesInput | SupportConversationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SupportConversation"> | string
    userId?: StringNullableWithAggregatesFilter<"SupportConversation"> | string | null
    guestName?: StringNullableWithAggregatesFilter<"SupportConversation"> | string | null
    guestPhone?: StringNullableWithAggregatesFilter<"SupportConversation"> | string | null
    status?: EnumConversationStatusWithAggregatesFilter<"SupportConversation"> | $Enums.ConversationStatus
    subject?: StringNullableWithAggregatesFilter<"SupportConversation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SupportConversation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SupportConversation"> | Date | string
    lastMessageAt?: DateTimeWithAggregatesFilter<"SupportConversation"> | Date | string
    pharmacistId?: StringNullableWithAggregatesFilter<"SupportConversation"> | string | null
    isRead?: BoolWithAggregatesFilter<"SupportConversation"> | boolean
  }

  export type SupportMessageWhereInput = {
    AND?: SupportMessageWhereInput | SupportMessageWhereInput[]
    OR?: SupportMessageWhereInput[]
    NOT?: SupportMessageWhereInput | SupportMessageWhereInput[]
    id?: StringFilter<"SupportMessage"> | string
    conversationId?: StringFilter<"SupportMessage"> | string
    content?: StringFilter<"SupportMessage"> | string
    senderType?: EnumSenderTypeFilter<"SupportMessage"> | $Enums.SenderType
    senderName?: StringFilter<"SupportMessage"> | string
    createdAt?: DateTimeFilter<"SupportMessage"> | Date | string
    isRead?: BoolFilter<"SupportMessage"> | boolean
    messageType?: EnumMessageTypeFilter<"SupportMessage"> | $Enums.MessageType
    productId?: StringNullableFilter<"SupportMessage"> | string | null
    productName?: StringNullableFilter<"SupportMessage"> | string | null
    productPrice?: FloatNullableFilter<"SupportMessage"> | number | null
    productImage?: StringNullableFilter<"SupportMessage"> | string | null
    conversation?: XOR<SupportConversationScalarRelationFilter, SupportConversationWhereInput>
  }

  export type SupportMessageOrderByWithRelationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    content?: SortOrder
    senderType?: SortOrder
    senderName?: SortOrder
    createdAt?: SortOrder
    isRead?: SortOrder
    messageType?: SortOrder
    productId?: SortOrderInput | SortOrder
    productName?: SortOrderInput | SortOrder
    productPrice?: SortOrderInput | SortOrder
    productImage?: SortOrderInput | SortOrder
    conversation?: SupportConversationOrderByWithRelationInput
  }

  export type SupportMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SupportMessageWhereInput | SupportMessageWhereInput[]
    OR?: SupportMessageWhereInput[]
    NOT?: SupportMessageWhereInput | SupportMessageWhereInput[]
    conversationId?: StringFilter<"SupportMessage"> | string
    content?: StringFilter<"SupportMessage"> | string
    senderType?: EnumSenderTypeFilter<"SupportMessage"> | $Enums.SenderType
    senderName?: StringFilter<"SupportMessage"> | string
    createdAt?: DateTimeFilter<"SupportMessage"> | Date | string
    isRead?: BoolFilter<"SupportMessage"> | boolean
    messageType?: EnumMessageTypeFilter<"SupportMessage"> | $Enums.MessageType
    productId?: StringNullableFilter<"SupportMessage"> | string | null
    productName?: StringNullableFilter<"SupportMessage"> | string | null
    productPrice?: FloatNullableFilter<"SupportMessage"> | number | null
    productImage?: StringNullableFilter<"SupportMessage"> | string | null
    conversation?: XOR<SupportConversationScalarRelationFilter, SupportConversationWhereInput>
  }, "id">

  export type SupportMessageOrderByWithAggregationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    content?: SortOrder
    senderType?: SortOrder
    senderName?: SortOrder
    createdAt?: SortOrder
    isRead?: SortOrder
    messageType?: SortOrder
    productId?: SortOrderInput | SortOrder
    productName?: SortOrderInput | SortOrder
    productPrice?: SortOrderInput | SortOrder
    productImage?: SortOrderInput | SortOrder
    _count?: SupportMessageCountOrderByAggregateInput
    _avg?: SupportMessageAvgOrderByAggregateInput
    _max?: SupportMessageMaxOrderByAggregateInput
    _min?: SupportMessageMinOrderByAggregateInput
    _sum?: SupportMessageSumOrderByAggregateInput
  }

  export type SupportMessageScalarWhereWithAggregatesInput = {
    AND?: SupportMessageScalarWhereWithAggregatesInput | SupportMessageScalarWhereWithAggregatesInput[]
    OR?: SupportMessageScalarWhereWithAggregatesInput[]
    NOT?: SupportMessageScalarWhereWithAggregatesInput | SupportMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SupportMessage"> | string
    conversationId?: StringWithAggregatesFilter<"SupportMessage"> | string
    content?: StringWithAggregatesFilter<"SupportMessage"> | string
    senderType?: EnumSenderTypeWithAggregatesFilter<"SupportMessage"> | $Enums.SenderType
    senderName?: StringWithAggregatesFilter<"SupportMessage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SupportMessage"> | Date | string
    isRead?: BoolWithAggregatesFilter<"SupportMessage"> | boolean
    messageType?: EnumMessageTypeWithAggregatesFilter<"SupportMessage"> | $Enums.MessageType
    productId?: StringNullableWithAggregatesFilter<"SupportMessage"> | string | null
    productName?: StringNullableWithAggregatesFilter<"SupportMessage"> | string | null
    productPrice?: FloatNullableWithAggregatesFilter<"SupportMessage"> | number | null
    productImage?: StringNullableWithAggregatesFilter<"SupportMessage"> | string | null
  }

  export type CustomerReviewWhereInput = {
    AND?: CustomerReviewWhereInput | CustomerReviewWhereInput[]
    OR?: CustomerReviewWhereInput[]
    NOT?: CustomerReviewWhereInput | CustomerReviewWhereInput[]
    id?: StringFilter<"CustomerReview"> | string
    name?: StringFilter<"CustomerReview"> | string
    rating?: IntFilter<"CustomerReview"> | number
    message?: StringFilter<"CustomerReview"> | string
    isApproved?: BoolFilter<"CustomerReview"> | boolean
    isRead?: BoolFilter<"CustomerReview"> | boolean
    createdAt?: DateTimeFilter<"CustomerReview"> | Date | string
    updatedAt?: DateTimeFilter<"CustomerReview"> | Date | string
  }

  export type CustomerReviewOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    rating?: SortOrder
    message?: SortOrder
    isApproved?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomerReviewWhereInput | CustomerReviewWhereInput[]
    OR?: CustomerReviewWhereInput[]
    NOT?: CustomerReviewWhereInput | CustomerReviewWhereInput[]
    name?: StringFilter<"CustomerReview"> | string
    rating?: IntFilter<"CustomerReview"> | number
    message?: StringFilter<"CustomerReview"> | string
    isApproved?: BoolFilter<"CustomerReview"> | boolean
    isRead?: BoolFilter<"CustomerReview"> | boolean
    createdAt?: DateTimeFilter<"CustomerReview"> | Date | string
    updatedAt?: DateTimeFilter<"CustomerReview"> | Date | string
  }, "id">

  export type CustomerReviewOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    rating?: SortOrder
    message?: SortOrder
    isApproved?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerReviewCountOrderByAggregateInput
    _avg?: CustomerReviewAvgOrderByAggregateInput
    _max?: CustomerReviewMaxOrderByAggregateInput
    _min?: CustomerReviewMinOrderByAggregateInput
    _sum?: CustomerReviewSumOrderByAggregateInput
  }

  export type CustomerReviewScalarWhereWithAggregatesInput = {
    AND?: CustomerReviewScalarWhereWithAggregatesInput | CustomerReviewScalarWhereWithAggregatesInput[]
    OR?: CustomerReviewScalarWhereWithAggregatesInput[]
    NOT?: CustomerReviewScalarWhereWithAggregatesInput | CustomerReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CustomerReview"> | string
    name?: StringWithAggregatesFilter<"CustomerReview"> | string
    rating?: IntWithAggregatesFilter<"CustomerReview"> | number
    message?: StringWithAggregatesFilter<"CustomerReview"> | string
    isApproved?: BoolWithAggregatesFilter<"CustomerReview"> | boolean
    isRead?: BoolWithAggregatesFilter<"CustomerReview"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"CustomerReview"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CustomerReview"> | Date | string
  }

  export type ProductRequestWhereInput = {
    AND?: ProductRequestWhereInput | ProductRequestWhereInput[]
    OR?: ProductRequestWhereInput[]
    NOT?: ProductRequestWhereInput | ProductRequestWhereInput[]
    id?: StringFilter<"ProductRequest"> | string
    name?: StringFilter<"ProductRequest"> | string
    productName?: StringFilter<"ProductRequest"> | string
    reason?: StringNullableFilter<"ProductRequest"> | string | null
    status?: EnumProductRequestStatusFilter<"ProductRequest"> | $Enums.ProductRequestStatus
    isRead?: BoolFilter<"ProductRequest"> | boolean
    createdAt?: DateTimeFilter<"ProductRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ProductRequest"> | Date | string
  }

  export type ProductRequestOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    productName?: SortOrder
    reason?: SortOrderInput | SortOrder
    status?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductRequestWhereInput | ProductRequestWhereInput[]
    OR?: ProductRequestWhereInput[]
    NOT?: ProductRequestWhereInput | ProductRequestWhereInput[]
    name?: StringFilter<"ProductRequest"> | string
    productName?: StringFilter<"ProductRequest"> | string
    reason?: StringNullableFilter<"ProductRequest"> | string | null
    status?: EnumProductRequestStatusFilter<"ProductRequest"> | $Enums.ProductRequestStatus
    isRead?: BoolFilter<"ProductRequest"> | boolean
    createdAt?: DateTimeFilter<"ProductRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ProductRequest"> | Date | string
  }, "id">

  export type ProductRequestOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    productName?: SortOrder
    reason?: SortOrderInput | SortOrder
    status?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductRequestCountOrderByAggregateInput
    _max?: ProductRequestMaxOrderByAggregateInput
    _min?: ProductRequestMinOrderByAggregateInput
  }

  export type ProductRequestScalarWhereWithAggregatesInput = {
    AND?: ProductRequestScalarWhereWithAggregatesInput | ProductRequestScalarWhereWithAggregatesInput[]
    OR?: ProductRequestScalarWhereWithAggregatesInput[]
    NOT?: ProductRequestScalarWhereWithAggregatesInput | ProductRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProductRequest"> | string
    name?: StringWithAggregatesFilter<"ProductRequest"> | string
    productName?: StringWithAggregatesFilter<"ProductRequest"> | string
    reason?: StringNullableWithAggregatesFilter<"ProductRequest"> | string | null
    status?: EnumProductRequestStatusWithAggregatesFilter<"ProductRequest"> | $Enums.ProductRequestStatus
    isRead?: BoolWithAggregatesFilter<"ProductRequest"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ProductRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProductRequest"> | Date | string
  }

  export type UserCreateInput = {
    id: string
    email?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id: string
    email?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id: string
    email?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    category?: string | null
    sku?: string | null
    price: Decimal | DecimalJsLike | number | string
    quantity?: number
    lowStock?: number | null
    dosage?: string | null
    dosageGuide?: NullableJsonNullValueInput | InputJsonValue
    manufacturer?: string | null
    expiryDate?: Date | string | null
    imageUrl?: string | null
    prescriptionRequired?: boolean
    activeListing?: boolean
    isFeatured?: boolean
    featuredRank?: number | null
    createAt?: Date | string
    updateAt?: Date | string
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    category?: string | null
    sku?: string | null
    price: Decimal | DecimalJsLike | number | string
    quantity?: number
    lowStock?: number | null
    dosage?: string | null
    dosageGuide?: NullableJsonNullValueInput | InputJsonValue
    manufacturer?: string | null
    expiryDate?: Date | string | null
    imageUrl?: string | null
    prescriptionRequired?: boolean
    activeListing?: boolean
    isFeatured?: boolean
    featuredRank?: number | null
    createAt?: Date | string
    updateAt?: Date | string
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    lowStock?: NullableIntFieldUpdateOperationsInput | number | null
    dosage?: NullableStringFieldUpdateOperationsInput | string | null
    dosageGuide?: NullableJsonNullValueInput | InputJsonValue
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    prescriptionRequired?: BoolFieldUpdateOperationsInput | boolean
    activeListing?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    featuredRank?: NullableIntFieldUpdateOperationsInput | number | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    lowStock?: NullableIntFieldUpdateOperationsInput | number | null
    dosage?: NullableStringFieldUpdateOperationsInput | string | null
    dosageGuide?: NullableJsonNullValueInput | InputJsonValue
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    prescriptionRequired?: BoolFieldUpdateOperationsInput | boolean
    activeListing?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    featuredRank?: NullableIntFieldUpdateOperationsInput | number | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    category?: string | null
    sku?: string | null
    price: Decimal | DecimalJsLike | number | string
    quantity?: number
    lowStock?: number | null
    dosage?: string | null
    dosageGuide?: NullableJsonNullValueInput | InputJsonValue
    manufacturer?: string | null
    expiryDate?: Date | string | null
    imageUrl?: string | null
    prescriptionRequired?: boolean
    activeListing?: boolean
    isFeatured?: boolean
    featuredRank?: number | null
    createAt?: Date | string
    updateAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    lowStock?: NullableIntFieldUpdateOperationsInput | number | null
    dosage?: NullableStringFieldUpdateOperationsInput | string | null
    dosageGuide?: NullableJsonNullValueInput | InputJsonValue
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    prescriptionRequired?: BoolFieldUpdateOperationsInput | boolean
    activeListing?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    featuredRank?: NullableIntFieldUpdateOperationsInput | number | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    lowStock?: NullableIntFieldUpdateOperationsInput | number | null
    dosage?: NullableStringFieldUpdateOperationsInput | string | null
    dosageGuide?: NullableJsonNullValueInput | InputJsonValue
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    prescriptionRequired?: BoolFieldUpdateOperationsInput | boolean
    activeListing?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    featuredRank?: NullableIntFieldUpdateOperationsInput | number | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateInput = {
    id?: string
    reference: string
    idempotencyKey?: string | null
    sellerId?: string | null
    email: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: string
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fulfillmentStatus?: $Enums.OrderStatus
    customerName?: string | null
    customerPhone?: string | null
    customerAddress?: string | null
    riderName?: string | null
    riderPhone?: string | null
    assignedAt?: Date | string | null
    pickedUpAt?: Date | string | null
    deliveredAt?: Date | string | null
    estimatedTime?: number | null
    adminNotes?: string | null
    notificationSent?: boolean
    items?: OrderItemCreateNestedManyWithoutOrderInput
    payment?: PaymentTransactionCreateNestedOneWithoutOrderInput
    statusHistory?: OrderStatusLogCreateNestedManyWithoutOrderInput
    rider?: RiderCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    reference: string
    idempotencyKey?: string | null
    sellerId?: string | null
    email: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: string
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fulfillmentStatus?: $Enums.OrderStatus
    customerName?: string | null
    customerPhone?: string | null
    customerAddress?: string | null
    riderId?: string | null
    riderName?: string | null
    riderPhone?: string | null
    assignedAt?: Date | string | null
    pickedUpAt?: Date | string | null
    deliveredAt?: Date | string | null
    estimatedTime?: number | null
    adminNotes?: string | null
    notificationSent?: boolean
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    payment?: PaymentTransactionUncheckedCreateNestedOneWithoutOrderInput
    statusHistory?: OrderStatusLogUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fulfillmentStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    riderName?: NullableStringFieldUpdateOperationsInput | string | null
    riderPhone?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickedUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    payment?: PaymentTransactionUpdateOneWithoutOrderNestedInput
    statusHistory?: OrderStatusLogUpdateManyWithoutOrderNestedInput
    rider?: RiderUpdateOneWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fulfillmentStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    riderId?: NullableStringFieldUpdateOperationsInput | string | null
    riderName?: NullableStringFieldUpdateOperationsInput | string | null
    riderPhone?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickedUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    payment?: PaymentTransactionUncheckedUpdateOneWithoutOrderNestedInput
    statusHistory?: OrderStatusLogUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: string
    reference: string
    idempotencyKey?: string | null
    sellerId?: string | null
    email: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: string
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fulfillmentStatus?: $Enums.OrderStatus
    customerName?: string | null
    customerPhone?: string | null
    customerAddress?: string | null
    riderId?: string | null
    riderName?: string | null
    riderPhone?: string | null
    assignedAt?: Date | string | null
    pickedUpAt?: Date | string | null
    deliveredAt?: Date | string | null
    estimatedTime?: number | null
    adminNotes?: string | null
    notificationSent?: boolean
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fulfillmentStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    riderName?: NullableStringFieldUpdateOperationsInput | string | null
    riderPhone?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickedUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fulfillmentStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    riderId?: NullableStringFieldUpdateOperationsInput | string | null
    riderName?: NullableStringFieldUpdateOperationsInput | string | null
    riderPhone?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickedUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrderStatusLogCreateInput = {
    id?: string
    status: $Enums.OrderStatus
    note?: string | null
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutStatusHistoryInput
  }

  export type OrderStatusLogUncheckedCreateInput = {
    id?: string
    orderId: string
    status: $Enums.OrderStatus
    note?: string | null
    createdAt?: Date | string
  }

  export type OrderStatusLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutStatusHistoryNestedInput
  }

  export type OrderStatusLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderStatusLogCreateManyInput = {
    id?: string
    orderId: string
    status: $Enums.OrderStatus
    note?: string | null
    createdAt?: Date | string
  }

  export type OrderStatusLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderStatusLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RiderCreateInput = {
    id?: string
    name: string
    phone: string
    whatsapp: string
    isActive?: boolean
    createdAt?: Date | string
    orders?: OrderCreateNestedManyWithoutRiderInput
  }

  export type RiderUncheckedCreateInput = {
    id?: string
    name: string
    phone: string
    whatsapp: string
    isActive?: boolean
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutRiderInput
  }

  export type RiderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutRiderNestedInput
  }

  export type RiderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutRiderNestedInput
  }

  export type RiderCreateManyInput = {
    id?: string
    name: string
    phone: string
    whatsapp: string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type RiderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RiderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateInput = {
    id?: string
    name: string
    unitPrice: Decimal | DecimalJsLike | number | string
    quantity: number
    lineTotal: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    category?: string | null
    order: OrderCreateNestedOneWithoutItemsInput
    product: ProductCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateInput = {
    id?: string
    orderId: string
    productId: string
    name: string
    unitPrice: Decimal | DecimalJsLike | number | string
    quantity: number
    lineTotal: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    category?: string | null
  }

  export type OrderItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    lineTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    lineTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemCreateManyInput = {
    id?: string
    orderId: string
    productId: string
    name: string
    unitPrice: Decimal | DecimalJsLike | number | string
    quantity: number
    lineTotal: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    category?: string | null
  }

  export type OrderItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    lineTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    lineTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentTransactionCreateInput = {
    id?: string
    reference: string
    provider?: string
    providerReference?: string | null
    authorizationUrl?: string | null
    accessCode?: string | null
    status?: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    paidAt?: Date | string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    order: OrderCreateNestedOneWithoutPaymentInput
  }

  export type PaymentTransactionUncheckedCreateInput = {
    id?: string
    orderId: string
    reference: string
    provider?: string
    providerReference?: string | null
    authorizationUrl?: string | null
    accessCode?: string | null
    status?: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    paidAt?: Date | string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerReference?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    accessCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutPaymentNestedInput
  }

  export type PaymentTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerReference?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    accessCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentTransactionCreateManyInput = {
    id?: string
    orderId: string
    reference: string
    provider?: string
    providerReference?: string | null
    authorizationUrl?: string | null
    accessCode?: string | null
    status?: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    paidAt?: Date | string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerReference?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    accessCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerReference?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    accessCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HeroSlideCreateInput = {
    id?: string
    title: string
    subtitle?: string | null
    imageUrl: string
    ctaText?: string | null
    ctaUrl?: string | null
    active?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HeroSlideUncheckedCreateInput = {
    id?: string
    title: string
    subtitle?: string | null
    imageUrl: string
    ctaText?: string | null
    ctaUrl?: string | null
    active?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HeroSlideUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: StringFieldUpdateOperationsInput | string
    ctaText?: NullableStringFieldUpdateOperationsInput | string | null
    ctaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HeroSlideUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: StringFieldUpdateOperationsInput | string
    ctaText?: NullableStringFieldUpdateOperationsInput | string | null
    ctaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HeroSlideCreateManyInput = {
    id?: string
    title: string
    subtitle?: string | null
    imageUrl: string
    ctaText?: string | null
    ctaUrl?: string | null
    active?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HeroSlideUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: StringFieldUpdateOperationsInput | string
    ctaText?: NullableStringFieldUpdateOperationsInput | string | null
    ctaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HeroSlideUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: StringFieldUpdateOperationsInput | string
    ctaText?: NullableStringFieldUpdateOperationsInput | string | null
    ctaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportConversationCreateInput = {
    id?: string
    userId?: string | null
    guestName?: string | null
    guestPhone?: string | null
    status?: $Enums.ConversationStatus
    subject?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastMessageAt?: Date | string
    pharmacistId?: string | null
    isRead?: boolean
    messages?: SupportMessageCreateNestedManyWithoutConversationInput
  }

  export type SupportConversationUncheckedCreateInput = {
    id?: string
    userId?: string | null
    guestName?: string | null
    guestPhone?: string | null
    status?: $Enums.ConversationStatus
    subject?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastMessageAt?: Date | string
    pharmacistId?: string | null
    isRead?: boolean
    messages?: SupportMessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type SupportConversationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    guestName?: NullableStringFieldUpdateOperationsInput | string | null
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumConversationStatusFieldUpdateOperationsInput | $Enums.ConversationStatus
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pharmacistId?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    messages?: SupportMessageUpdateManyWithoutConversationNestedInput
  }

  export type SupportConversationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    guestName?: NullableStringFieldUpdateOperationsInput | string | null
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumConversationStatusFieldUpdateOperationsInput | $Enums.ConversationStatus
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pharmacistId?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    messages?: SupportMessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type SupportConversationCreateManyInput = {
    id?: string
    userId?: string | null
    guestName?: string | null
    guestPhone?: string | null
    status?: $Enums.ConversationStatus
    subject?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastMessageAt?: Date | string
    pharmacistId?: string | null
    isRead?: boolean
  }

  export type SupportConversationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    guestName?: NullableStringFieldUpdateOperationsInput | string | null
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumConversationStatusFieldUpdateOperationsInput | $Enums.ConversationStatus
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pharmacistId?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SupportConversationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    guestName?: NullableStringFieldUpdateOperationsInput | string | null
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumConversationStatusFieldUpdateOperationsInput | $Enums.ConversationStatus
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pharmacistId?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SupportMessageCreateInput = {
    id?: string
    content: string
    senderType: $Enums.SenderType
    senderName: string
    createdAt?: Date | string
    isRead?: boolean
    messageType?: $Enums.MessageType
    productId?: string | null
    productName?: string | null
    productPrice?: number | null
    productImage?: string | null
    conversation: SupportConversationCreateNestedOneWithoutMessagesInput
  }

  export type SupportMessageUncheckedCreateInput = {
    id?: string
    conversationId: string
    content: string
    senderType: $Enums.SenderType
    senderName: string
    createdAt?: Date | string
    isRead?: boolean
    messageType?: $Enums.MessageType
    productId?: string | null
    productName?: string | null
    productPrice?: number | null
    productImage?: string | null
  }

  export type SupportMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    senderType?: EnumSenderTypeFieldUpdateOperationsInput | $Enums.SenderType
    senderName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    messageType?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    productName?: NullableStringFieldUpdateOperationsInput | string | null
    productPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    conversation?: SupportConversationUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type SupportMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    senderType?: EnumSenderTypeFieldUpdateOperationsInput | $Enums.SenderType
    senderName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    messageType?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    productName?: NullableStringFieldUpdateOperationsInput | string | null
    productPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SupportMessageCreateManyInput = {
    id?: string
    conversationId: string
    content: string
    senderType: $Enums.SenderType
    senderName: string
    createdAt?: Date | string
    isRead?: boolean
    messageType?: $Enums.MessageType
    productId?: string | null
    productName?: string | null
    productPrice?: number | null
    productImage?: string | null
  }

  export type SupportMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    senderType?: EnumSenderTypeFieldUpdateOperationsInput | $Enums.SenderType
    senderName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    messageType?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    productName?: NullableStringFieldUpdateOperationsInput | string | null
    productPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SupportMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    senderType?: EnumSenderTypeFieldUpdateOperationsInput | $Enums.SenderType
    senderName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    messageType?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    productName?: NullableStringFieldUpdateOperationsInput | string | null
    productPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CustomerReviewCreateInput = {
    id?: string
    name: string
    rating: number
    message: string
    isApproved?: boolean
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerReviewUncheckedCreateInput = {
    id?: string
    name: string
    rating: number
    message: string
    isApproved?: boolean
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerReviewCreateManyInput = {
    id?: string
    name: string
    rating: number
    message: string
    isApproved?: boolean
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductRequestCreateInput = {
    id?: string
    name: string
    productName: string
    reason?: string | null
    status?: $Enums.ProductRequestStatus
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductRequestUncheckedCreateInput = {
    id?: string
    name: string
    productName: string
    reason?: string | null
    status?: $Enums.ProductRequestStatus
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProductRequestStatusFieldUpdateOperationsInput | $Enums.ProductRequestStatus
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProductRequestStatusFieldUpdateOperationsInput | $Enums.ProductRequestStatus
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductRequestCreateManyInput = {
    id?: string
    name: string
    productName: string
    reason?: string | null
    status?: $Enums.ProductRequestStatus
    isRead?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProductRequestStatusFieldUpdateOperationsInput | $Enums.ProductRequestStatus
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProductRequestStatusFieldUpdateOperationsInput | $Enums.ProductRequestStatus
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
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

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
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

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
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

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput
    some?: OrderItemWhereInput
    none?: OrderItemWhereInput
  }

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    sku?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    lowStock?: SortOrder
    dosage?: SortOrder
    dosageGuide?: SortOrder
    manufacturer?: SortOrder
    expiryDate?: SortOrder
    imageUrl?: SortOrder
    prescriptionRequired?: SortOrder
    activeListing?: SortOrder
    isFeatured?: SortOrder
    featuredRank?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    price?: SortOrder
    quantity?: SortOrder
    lowStock?: SortOrder
    featuredRank?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    sku?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    lowStock?: SortOrder
    dosage?: SortOrder
    manufacturer?: SortOrder
    expiryDate?: SortOrder
    imageUrl?: SortOrder
    prescriptionRequired?: SortOrder
    activeListing?: SortOrder
    isFeatured?: SortOrder
    featuredRank?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    sku?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    lowStock?: SortOrder
    dosage?: SortOrder
    manufacturer?: SortOrder
    expiryDate?: SortOrder
    imageUrl?: SortOrder
    prescriptionRequired?: SortOrder
    activeListing?: SortOrder
    isFeatured?: SortOrder
    featuredRank?: SortOrder
    createAt?: SortOrder
    updateAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    price?: SortOrder
    quantity?: SortOrder
    lowStock?: SortOrder
    featuredRank?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type PaymentTransactionNullableScalarRelationFilter = {
    is?: PaymentTransactionWhereInput | null
    isNot?: PaymentTransactionWhereInput | null
  }

  export type OrderStatusLogListRelationFilter = {
    every?: OrderStatusLogWhereInput
    some?: OrderStatusLogWhereInput
    none?: OrderStatusLogWhereInput
  }

  export type RiderNullableScalarRelationFilter = {
    is?: RiderWhereInput | null
    isNot?: RiderWhereInput | null
  }

  export type OrderStatusLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    reference?: SortOrder
    idempotencyKey?: SortOrder
    sellerId?: SortOrder
    email?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fulfillmentStatus?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    customerAddress?: SortOrder
    riderId?: SortOrder
    riderName?: SortOrder
    riderPhone?: SortOrder
    assignedAt?: SortOrder
    pickedUpAt?: SortOrder
    deliveredAt?: SortOrder
    estimatedTime?: SortOrder
    adminNotes?: SortOrder
    notificationSent?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    amount?: SortOrder
    estimatedTime?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    reference?: SortOrder
    idempotencyKey?: SortOrder
    sellerId?: SortOrder
    email?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fulfillmentStatus?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    customerAddress?: SortOrder
    riderId?: SortOrder
    riderName?: SortOrder
    riderPhone?: SortOrder
    assignedAt?: SortOrder
    pickedUpAt?: SortOrder
    deliveredAt?: SortOrder
    estimatedTime?: SortOrder
    adminNotes?: SortOrder
    notificationSent?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    reference?: SortOrder
    idempotencyKey?: SortOrder
    sellerId?: SortOrder
    email?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fulfillmentStatus?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    customerAddress?: SortOrder
    riderId?: SortOrder
    riderName?: SortOrder
    riderPhone?: SortOrder
    assignedAt?: SortOrder
    pickedUpAt?: SortOrder
    deliveredAt?: SortOrder
    estimatedTime?: SortOrder
    adminNotes?: SortOrder
    notificationSent?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    amount?: SortOrder
    estimatedTime?: SortOrder
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type OrderStatusLogCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderStatusLogMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderStatusLogMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RiderCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    whatsapp?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type RiderMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    whatsapp?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type RiderMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    whatsapp?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type OrderItemCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    lineTotal?: SortOrder
    imageUrl?: SortOrder
    category?: SortOrder
  }

  export type OrderItemAvgOrderByAggregateInput = {
    unitPrice?: SortOrder
    quantity?: SortOrder
    lineTotal?: SortOrder
  }

  export type OrderItemMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    lineTotal?: SortOrder
    imageUrl?: SortOrder
    category?: SortOrder
  }

  export type OrderItemMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    lineTotal?: SortOrder
    imageUrl?: SortOrder
    category?: SortOrder
  }

  export type OrderItemSumOrderByAggregateInput = {
    unitPrice?: SortOrder
    quantity?: SortOrder
    lineTotal?: SortOrder
  }

  export type PaymentTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    reference?: SortOrder
    provider?: SortOrder
    providerReference?: SortOrder
    authorizationUrl?: SortOrder
    accessCode?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paidAt?: SortOrder
    rawPayload?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentTransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PaymentTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    reference?: SortOrder
    provider?: SortOrder
    providerReference?: SortOrder
    authorizationUrl?: SortOrder
    accessCode?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    reference?: SortOrder
    provider?: SortOrder
    providerReference?: SortOrder
    authorizationUrl?: SortOrder
    accessCode?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentTransactionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type HeroSlideCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    imageUrl?: SortOrder
    ctaText?: SortOrder
    ctaUrl?: SortOrder
    active?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HeroSlideAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type HeroSlideMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    imageUrl?: SortOrder
    ctaText?: SortOrder
    ctaUrl?: SortOrder
    active?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HeroSlideMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    imageUrl?: SortOrder
    ctaText?: SortOrder
    ctaUrl?: SortOrder
    active?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HeroSlideSumOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type EnumConversationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationStatus | EnumConversationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationStatus[] | ListEnumConversationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationStatus[] | ListEnumConversationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationStatusFilter<$PrismaModel> | $Enums.ConversationStatus
  }

  export type SupportMessageListRelationFilter = {
    every?: SupportMessageWhereInput
    some?: SupportMessageWhereInput
    none?: SupportMessageWhereInput
  }

  export type SupportMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SupportConversationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    guestName?: SortOrder
    guestPhone?: SortOrder
    status?: SortOrder
    subject?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastMessageAt?: SortOrder
    pharmacistId?: SortOrder
    isRead?: SortOrder
  }

  export type SupportConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    guestName?: SortOrder
    guestPhone?: SortOrder
    status?: SortOrder
    subject?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastMessageAt?: SortOrder
    pharmacistId?: SortOrder
    isRead?: SortOrder
  }

  export type SupportConversationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    guestName?: SortOrder
    guestPhone?: SortOrder
    status?: SortOrder
    subject?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastMessageAt?: SortOrder
    pharmacistId?: SortOrder
    isRead?: SortOrder
  }

  export type EnumConversationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationStatus | EnumConversationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationStatus[] | ListEnumConversationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationStatus[] | ListEnumConversationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConversationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConversationStatusFilter<$PrismaModel>
    _max?: NestedEnumConversationStatusFilter<$PrismaModel>
  }

  export type EnumSenderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SenderType | EnumSenderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SenderType[] | ListEnumSenderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SenderType[] | ListEnumSenderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSenderTypeFilter<$PrismaModel> | $Enums.SenderType
  }

  export type EnumMessageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageTypeFilter<$PrismaModel> | $Enums.MessageType
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type SupportConversationScalarRelationFilter = {
    is?: SupportConversationWhereInput
    isNot?: SupportConversationWhereInput
  }

  export type SupportMessageCountOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    content?: SortOrder
    senderType?: SortOrder
    senderName?: SortOrder
    createdAt?: SortOrder
    isRead?: SortOrder
    messageType?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    productPrice?: SortOrder
    productImage?: SortOrder
  }

  export type SupportMessageAvgOrderByAggregateInput = {
    productPrice?: SortOrder
  }

  export type SupportMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    content?: SortOrder
    senderType?: SortOrder
    senderName?: SortOrder
    createdAt?: SortOrder
    isRead?: SortOrder
    messageType?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    productPrice?: SortOrder
    productImage?: SortOrder
  }

  export type SupportMessageMinOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    content?: SortOrder
    senderType?: SortOrder
    senderName?: SortOrder
    createdAt?: SortOrder
    isRead?: SortOrder
    messageType?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    productPrice?: SortOrder
    productImage?: SortOrder
  }

  export type SupportMessageSumOrderByAggregateInput = {
    productPrice?: SortOrder
  }

  export type EnumSenderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SenderType | EnumSenderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SenderType[] | ListEnumSenderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SenderType[] | ListEnumSenderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSenderTypeWithAggregatesFilter<$PrismaModel> | $Enums.SenderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSenderTypeFilter<$PrismaModel>
    _max?: NestedEnumSenderTypeFilter<$PrismaModel>
  }

  export type EnumMessageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel> | $Enums.MessageType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageTypeFilter<$PrismaModel>
    _max?: NestedEnumMessageTypeFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type CustomerReviewCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    rating?: SortOrder
    message?: SortOrder
    isApproved?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type CustomerReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    rating?: SortOrder
    message?: SortOrder
    isApproved?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerReviewMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    rating?: SortOrder
    message?: SortOrder
    isApproved?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerReviewSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type EnumProductRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductRequestStatus | EnumProductRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductRequestStatus[] | ListEnumProductRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductRequestStatus[] | ListEnumProductRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductRequestStatusFilter<$PrismaModel> | $Enums.ProductRequestStatus
  }

  export type ProductRequestCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    productName?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    productName?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductRequestMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    productName?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumProductRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductRequestStatus | EnumProductRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductRequestStatus[] | ListEnumProductRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductRequestStatus[] | ListEnumProductRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProductRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumProductRequestStatusFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type OrderItemCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type OrderItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type PaymentTransactionCreateNestedOneWithoutOrderInput = {
    create?: XOR<PaymentTransactionCreateWithoutOrderInput, PaymentTransactionUncheckedCreateWithoutOrderInput>
    connectOrCreate?: PaymentTransactionCreateOrConnectWithoutOrderInput
    connect?: PaymentTransactionWhereUniqueInput
  }

  export type OrderStatusLogCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderStatusLogCreateWithoutOrderInput, OrderStatusLogUncheckedCreateWithoutOrderInput> | OrderStatusLogCreateWithoutOrderInput[] | OrderStatusLogUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderStatusLogCreateOrConnectWithoutOrderInput | OrderStatusLogCreateOrConnectWithoutOrderInput[]
    createMany?: OrderStatusLogCreateManyOrderInputEnvelope
    connect?: OrderStatusLogWhereUniqueInput | OrderStatusLogWhereUniqueInput[]
  }

  export type RiderCreateNestedOneWithoutOrdersInput = {
    create?: XOR<RiderCreateWithoutOrdersInput, RiderUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: RiderCreateOrConnectWithoutOrdersInput
    connect?: RiderWhereUniqueInput
  }

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type PaymentTransactionUncheckedCreateNestedOneWithoutOrderInput = {
    create?: XOR<PaymentTransactionCreateWithoutOrderInput, PaymentTransactionUncheckedCreateWithoutOrderInput>
    connectOrCreate?: PaymentTransactionCreateOrConnectWithoutOrderInput
    connect?: PaymentTransactionWhereUniqueInput
  }

  export type OrderStatusLogUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderStatusLogCreateWithoutOrderInput, OrderStatusLogUncheckedCreateWithoutOrderInput> | OrderStatusLogCreateWithoutOrderInput[] | OrderStatusLogUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderStatusLogCreateOrConnectWithoutOrderInput | OrderStatusLogCreateOrConnectWithoutOrderInput[]
    createMany?: OrderStatusLogCreateManyOrderInputEnvelope
    connect?: OrderStatusLogWhereUniqueInput | OrderStatusLogWhereUniqueInput[]
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type PaymentTransactionUpdateOneWithoutOrderNestedInput = {
    create?: XOR<PaymentTransactionCreateWithoutOrderInput, PaymentTransactionUncheckedCreateWithoutOrderInput>
    connectOrCreate?: PaymentTransactionCreateOrConnectWithoutOrderInput
    upsert?: PaymentTransactionUpsertWithoutOrderInput
    disconnect?: PaymentTransactionWhereInput | boolean
    delete?: PaymentTransactionWhereInput | boolean
    connect?: PaymentTransactionWhereUniqueInput
    update?: XOR<XOR<PaymentTransactionUpdateToOneWithWhereWithoutOrderInput, PaymentTransactionUpdateWithoutOrderInput>, PaymentTransactionUncheckedUpdateWithoutOrderInput>
  }

  export type OrderStatusLogUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderStatusLogCreateWithoutOrderInput, OrderStatusLogUncheckedCreateWithoutOrderInput> | OrderStatusLogCreateWithoutOrderInput[] | OrderStatusLogUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderStatusLogCreateOrConnectWithoutOrderInput | OrderStatusLogCreateOrConnectWithoutOrderInput[]
    upsert?: OrderStatusLogUpsertWithWhereUniqueWithoutOrderInput | OrderStatusLogUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderStatusLogCreateManyOrderInputEnvelope
    set?: OrderStatusLogWhereUniqueInput | OrderStatusLogWhereUniqueInput[]
    disconnect?: OrderStatusLogWhereUniqueInput | OrderStatusLogWhereUniqueInput[]
    delete?: OrderStatusLogWhereUniqueInput | OrderStatusLogWhereUniqueInput[]
    connect?: OrderStatusLogWhereUniqueInput | OrderStatusLogWhereUniqueInput[]
    update?: OrderStatusLogUpdateWithWhereUniqueWithoutOrderInput | OrderStatusLogUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderStatusLogUpdateManyWithWhereWithoutOrderInput | OrderStatusLogUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderStatusLogScalarWhereInput | OrderStatusLogScalarWhereInput[]
  }

  export type RiderUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<RiderCreateWithoutOrdersInput, RiderUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: RiderCreateOrConnectWithoutOrdersInput
    upsert?: RiderUpsertWithoutOrdersInput
    disconnect?: RiderWhereInput | boolean
    delete?: RiderWhereInput | boolean
    connect?: RiderWhereUniqueInput
    update?: XOR<XOR<RiderUpdateToOneWithWhereWithoutOrdersInput, RiderUpdateWithoutOrdersInput>, RiderUncheckedUpdateWithoutOrdersInput>
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type PaymentTransactionUncheckedUpdateOneWithoutOrderNestedInput = {
    create?: XOR<PaymentTransactionCreateWithoutOrderInput, PaymentTransactionUncheckedCreateWithoutOrderInput>
    connectOrCreate?: PaymentTransactionCreateOrConnectWithoutOrderInput
    upsert?: PaymentTransactionUpsertWithoutOrderInput
    disconnect?: PaymentTransactionWhereInput | boolean
    delete?: PaymentTransactionWhereInput | boolean
    connect?: PaymentTransactionWhereUniqueInput
    update?: XOR<XOR<PaymentTransactionUpdateToOneWithWhereWithoutOrderInput, PaymentTransactionUpdateWithoutOrderInput>, PaymentTransactionUncheckedUpdateWithoutOrderInput>
  }

  export type OrderStatusLogUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderStatusLogCreateWithoutOrderInput, OrderStatusLogUncheckedCreateWithoutOrderInput> | OrderStatusLogCreateWithoutOrderInput[] | OrderStatusLogUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderStatusLogCreateOrConnectWithoutOrderInput | OrderStatusLogCreateOrConnectWithoutOrderInput[]
    upsert?: OrderStatusLogUpsertWithWhereUniqueWithoutOrderInput | OrderStatusLogUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderStatusLogCreateManyOrderInputEnvelope
    set?: OrderStatusLogWhereUniqueInput | OrderStatusLogWhereUniqueInput[]
    disconnect?: OrderStatusLogWhereUniqueInput | OrderStatusLogWhereUniqueInput[]
    delete?: OrderStatusLogWhereUniqueInput | OrderStatusLogWhereUniqueInput[]
    connect?: OrderStatusLogWhereUniqueInput | OrderStatusLogWhereUniqueInput[]
    update?: OrderStatusLogUpdateWithWhereUniqueWithoutOrderInput | OrderStatusLogUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderStatusLogUpdateManyWithWhereWithoutOrderInput | OrderStatusLogUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderStatusLogScalarWhereInput | OrderStatusLogScalarWhereInput[]
  }

  export type OrderCreateNestedOneWithoutStatusHistoryInput = {
    create?: XOR<OrderCreateWithoutStatusHistoryInput, OrderUncheckedCreateWithoutStatusHistoryInput>
    connectOrCreate?: OrderCreateOrConnectWithoutStatusHistoryInput
    connect?: OrderWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutStatusHistoryNestedInput = {
    create?: XOR<OrderCreateWithoutStatusHistoryInput, OrderUncheckedCreateWithoutStatusHistoryInput>
    connectOrCreate?: OrderCreateOrConnectWithoutStatusHistoryInput
    upsert?: OrderUpsertWithoutStatusHistoryInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutStatusHistoryInput, OrderUpdateWithoutStatusHistoryInput>, OrderUncheckedUpdateWithoutStatusHistoryInput>
  }

  export type OrderCreateNestedManyWithoutRiderInput = {
    create?: XOR<OrderCreateWithoutRiderInput, OrderUncheckedCreateWithoutRiderInput> | OrderCreateWithoutRiderInput[] | OrderUncheckedCreateWithoutRiderInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutRiderInput | OrderCreateOrConnectWithoutRiderInput[]
    createMany?: OrderCreateManyRiderInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutRiderInput = {
    create?: XOR<OrderCreateWithoutRiderInput, OrderUncheckedCreateWithoutRiderInput> | OrderCreateWithoutRiderInput[] | OrderUncheckedCreateWithoutRiderInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutRiderInput | OrderCreateOrConnectWithoutRiderInput[]
    createMany?: OrderCreateManyRiderInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderUpdateManyWithoutRiderNestedInput = {
    create?: XOR<OrderCreateWithoutRiderInput, OrderUncheckedCreateWithoutRiderInput> | OrderCreateWithoutRiderInput[] | OrderUncheckedCreateWithoutRiderInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutRiderInput | OrderCreateOrConnectWithoutRiderInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutRiderInput | OrderUpsertWithWhereUniqueWithoutRiderInput[]
    createMany?: OrderCreateManyRiderInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutRiderInput | OrderUpdateWithWhereUniqueWithoutRiderInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutRiderInput | OrderUpdateManyWithWhereWithoutRiderInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutRiderNestedInput = {
    create?: XOR<OrderCreateWithoutRiderInput, OrderUncheckedCreateWithoutRiderInput> | OrderCreateWithoutRiderInput[] | OrderUncheckedCreateWithoutRiderInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutRiderInput | OrderCreateOrConnectWithoutRiderInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutRiderInput | OrderUpsertWithWhereUniqueWithoutRiderInput[]
    createMany?: OrderCreateManyRiderInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutRiderInput | OrderUpdateWithWhereUniqueWithoutRiderInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutRiderInput | OrderUpdateManyWithWhereWithoutRiderInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type OrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    connect?: OrderWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutOrderItemsInput = {
    create?: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput
    connect?: ProductWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    upsert?: OrderUpsertWithoutItemsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutItemsInput, OrderUpdateWithoutItemsInput>, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type ProductUpdateOneRequiredWithoutOrderItemsNestedInput = {
    create?: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput
    upsert?: ProductUpsertWithoutOrderItemsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutOrderItemsInput, ProductUpdateWithoutOrderItemsInput>, ProductUncheckedUpdateWithoutOrderItemsInput>
  }

  export type OrderCreateNestedOneWithoutPaymentInput = {
    create?: XOR<OrderCreateWithoutPaymentInput, OrderUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: OrderCreateOrConnectWithoutPaymentInput
    connect?: OrderWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutPaymentNestedInput = {
    create?: XOR<OrderCreateWithoutPaymentInput, OrderUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: OrderCreateOrConnectWithoutPaymentInput
    upsert?: OrderUpsertWithoutPaymentInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutPaymentInput, OrderUpdateWithoutPaymentInput>, OrderUncheckedUpdateWithoutPaymentInput>
  }

  export type SupportMessageCreateNestedManyWithoutConversationInput = {
    create?: XOR<SupportMessageCreateWithoutConversationInput, SupportMessageUncheckedCreateWithoutConversationInput> | SupportMessageCreateWithoutConversationInput[] | SupportMessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: SupportMessageCreateOrConnectWithoutConversationInput | SupportMessageCreateOrConnectWithoutConversationInput[]
    createMany?: SupportMessageCreateManyConversationInputEnvelope
    connect?: SupportMessageWhereUniqueInput | SupportMessageWhereUniqueInput[]
  }

  export type SupportMessageUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<SupportMessageCreateWithoutConversationInput, SupportMessageUncheckedCreateWithoutConversationInput> | SupportMessageCreateWithoutConversationInput[] | SupportMessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: SupportMessageCreateOrConnectWithoutConversationInput | SupportMessageCreateOrConnectWithoutConversationInput[]
    createMany?: SupportMessageCreateManyConversationInputEnvelope
    connect?: SupportMessageWhereUniqueInput | SupportMessageWhereUniqueInput[]
  }

  export type EnumConversationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ConversationStatus
  }

  export type SupportMessageUpdateManyWithoutConversationNestedInput = {
    create?: XOR<SupportMessageCreateWithoutConversationInput, SupportMessageUncheckedCreateWithoutConversationInput> | SupportMessageCreateWithoutConversationInput[] | SupportMessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: SupportMessageCreateOrConnectWithoutConversationInput | SupportMessageCreateOrConnectWithoutConversationInput[]
    upsert?: SupportMessageUpsertWithWhereUniqueWithoutConversationInput | SupportMessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: SupportMessageCreateManyConversationInputEnvelope
    set?: SupportMessageWhereUniqueInput | SupportMessageWhereUniqueInput[]
    disconnect?: SupportMessageWhereUniqueInput | SupportMessageWhereUniqueInput[]
    delete?: SupportMessageWhereUniqueInput | SupportMessageWhereUniqueInput[]
    connect?: SupportMessageWhereUniqueInput | SupportMessageWhereUniqueInput[]
    update?: SupportMessageUpdateWithWhereUniqueWithoutConversationInput | SupportMessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: SupportMessageUpdateManyWithWhereWithoutConversationInput | SupportMessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: SupportMessageScalarWhereInput | SupportMessageScalarWhereInput[]
  }

  export type SupportMessageUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<SupportMessageCreateWithoutConversationInput, SupportMessageUncheckedCreateWithoutConversationInput> | SupportMessageCreateWithoutConversationInput[] | SupportMessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: SupportMessageCreateOrConnectWithoutConversationInput | SupportMessageCreateOrConnectWithoutConversationInput[]
    upsert?: SupportMessageUpsertWithWhereUniqueWithoutConversationInput | SupportMessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: SupportMessageCreateManyConversationInputEnvelope
    set?: SupportMessageWhereUniqueInput | SupportMessageWhereUniqueInput[]
    disconnect?: SupportMessageWhereUniqueInput | SupportMessageWhereUniqueInput[]
    delete?: SupportMessageWhereUniqueInput | SupportMessageWhereUniqueInput[]
    connect?: SupportMessageWhereUniqueInput | SupportMessageWhereUniqueInput[]
    update?: SupportMessageUpdateWithWhereUniqueWithoutConversationInput | SupportMessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: SupportMessageUpdateManyWithWhereWithoutConversationInput | SupportMessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: SupportMessageScalarWhereInput | SupportMessageScalarWhereInput[]
  }

  export type SupportConversationCreateNestedOneWithoutMessagesInput = {
    create?: XOR<SupportConversationCreateWithoutMessagesInput, SupportConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: SupportConversationCreateOrConnectWithoutMessagesInput
    connect?: SupportConversationWhereUniqueInput
  }

  export type EnumSenderTypeFieldUpdateOperationsInput = {
    set?: $Enums.SenderType
  }

  export type EnumMessageTypeFieldUpdateOperationsInput = {
    set?: $Enums.MessageType
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SupportConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<SupportConversationCreateWithoutMessagesInput, SupportConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: SupportConversationCreateOrConnectWithoutMessagesInput
    upsert?: SupportConversationUpsertWithoutMessagesInput
    connect?: SupportConversationWhereUniqueInput
    update?: XOR<XOR<SupportConversationUpdateToOneWithWhereWithoutMessagesInput, SupportConversationUpdateWithoutMessagesInput>, SupportConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type EnumProductRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProductRequestStatus
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

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
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

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
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

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type NestedEnumConversationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationStatus | EnumConversationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationStatus[] | ListEnumConversationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationStatus[] | ListEnumConversationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationStatusFilter<$PrismaModel> | $Enums.ConversationStatus
  }

  export type NestedEnumConversationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationStatus | EnumConversationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationStatus[] | ListEnumConversationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationStatus[] | ListEnumConversationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConversationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConversationStatusFilter<$PrismaModel>
    _max?: NestedEnumConversationStatusFilter<$PrismaModel>
  }

  export type NestedEnumSenderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SenderType | EnumSenderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SenderType[] | ListEnumSenderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SenderType[] | ListEnumSenderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSenderTypeFilter<$PrismaModel> | $Enums.SenderType
  }

  export type NestedEnumMessageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageTypeFilter<$PrismaModel> | $Enums.MessageType
  }

  export type NestedEnumSenderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SenderType | EnumSenderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SenderType[] | ListEnumSenderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SenderType[] | ListEnumSenderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSenderTypeWithAggregatesFilter<$PrismaModel> | $Enums.SenderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSenderTypeFilter<$PrismaModel>
    _max?: NestedEnumSenderTypeFilter<$PrismaModel>
  }

  export type NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel> | $Enums.MessageType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageTypeFilter<$PrismaModel>
    _max?: NestedEnumMessageTypeFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumProductRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductRequestStatus | EnumProductRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductRequestStatus[] | ListEnumProductRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductRequestStatus[] | ListEnumProductRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductRequestStatusFilter<$PrismaModel> | $Enums.ProductRequestStatus
  }

  export type NestedEnumProductRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductRequestStatus | EnumProductRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductRequestStatus[] | ListEnumProductRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductRequestStatus[] | ListEnumProductRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProductRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumProductRequestStatusFilter<$PrismaModel>
  }

  export type OrderItemCreateWithoutProductInput = {
    id?: string
    name: string
    unitPrice: Decimal | DecimalJsLike | number | string
    quantity: number
    lineTotal: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    category?: string | null
    order: OrderCreateNestedOneWithoutItemsInput
  }

  export type OrderItemUncheckedCreateWithoutProductInput = {
    id?: string
    orderId: string
    name: string
    unitPrice: Decimal | DecimalJsLike | number | string
    quantity: number
    lineTotal: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    category?: string | null
  }

  export type OrderItemCreateOrConnectWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemCreateManyProductInputEnvelope = {
    data: OrderItemCreateManyProductInput | OrderItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type OrderItemUpsertWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutProductInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutProductInput>
  }

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    OR?: OrderItemScalarWhereInput[]
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    name?: StringFilter<"OrderItem"> | string
    unitPrice?: DecimalFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    quantity?: IntFilter<"OrderItem"> | number
    lineTotal?: DecimalFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    imageUrl?: StringNullableFilter<"OrderItem"> | string | null
    category?: StringNullableFilter<"OrderItem"> | string | null
  }

  export type OrderItemCreateWithoutOrderInput = {
    id?: string
    name: string
    unitPrice: Decimal | DecimalJsLike | number | string
    quantity: number
    lineTotal: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    category?: string | null
    product: ProductCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    id?: string
    productId: string
    name: string
    unitPrice: Decimal | DecimalJsLike | number | string
    quantity: number
    lineTotal: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    category?: string | null
  }

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type PaymentTransactionCreateWithoutOrderInput = {
    id?: string
    reference: string
    provider?: string
    providerReference?: string | null
    authorizationUrl?: string | null
    accessCode?: string | null
    status?: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    paidAt?: Date | string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentTransactionUncheckedCreateWithoutOrderInput = {
    id?: string
    reference: string
    provider?: string
    providerReference?: string | null
    authorizationUrl?: string | null
    accessCode?: string | null
    status?: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    paidAt?: Date | string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentTransactionCreateOrConnectWithoutOrderInput = {
    where: PaymentTransactionWhereUniqueInput
    create: XOR<PaymentTransactionCreateWithoutOrderInput, PaymentTransactionUncheckedCreateWithoutOrderInput>
  }

  export type OrderStatusLogCreateWithoutOrderInput = {
    id?: string
    status: $Enums.OrderStatus
    note?: string | null
    createdAt?: Date | string
  }

  export type OrderStatusLogUncheckedCreateWithoutOrderInput = {
    id?: string
    status: $Enums.OrderStatus
    note?: string | null
    createdAt?: Date | string
  }

  export type OrderStatusLogCreateOrConnectWithoutOrderInput = {
    where: OrderStatusLogWhereUniqueInput
    create: XOR<OrderStatusLogCreateWithoutOrderInput, OrderStatusLogUncheckedCreateWithoutOrderInput>
  }

  export type OrderStatusLogCreateManyOrderInputEnvelope = {
    data: OrderStatusLogCreateManyOrderInput | OrderStatusLogCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type RiderCreateWithoutOrdersInput = {
    id?: string
    name: string
    phone: string
    whatsapp: string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type RiderUncheckedCreateWithoutOrdersInput = {
    id?: string
    name: string
    phone: string
    whatsapp: string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type RiderCreateOrConnectWithoutOrdersInput = {
    where: RiderWhereUniqueInput
    create: XOR<RiderCreateWithoutOrdersInput, RiderUncheckedCreateWithoutOrdersInput>
  }

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutOrderInput>
  }

  export type PaymentTransactionUpsertWithoutOrderInput = {
    update: XOR<PaymentTransactionUpdateWithoutOrderInput, PaymentTransactionUncheckedUpdateWithoutOrderInput>
    create: XOR<PaymentTransactionCreateWithoutOrderInput, PaymentTransactionUncheckedCreateWithoutOrderInput>
    where?: PaymentTransactionWhereInput
  }

  export type PaymentTransactionUpdateToOneWithWhereWithoutOrderInput = {
    where?: PaymentTransactionWhereInput
    data: XOR<PaymentTransactionUpdateWithoutOrderInput, PaymentTransactionUncheckedUpdateWithoutOrderInput>
  }

  export type PaymentTransactionUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerReference?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    accessCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentTransactionUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerReference?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    accessCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderStatusLogUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderStatusLogWhereUniqueInput
    update: XOR<OrderStatusLogUpdateWithoutOrderInput, OrderStatusLogUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderStatusLogCreateWithoutOrderInput, OrderStatusLogUncheckedCreateWithoutOrderInput>
  }

  export type OrderStatusLogUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderStatusLogWhereUniqueInput
    data: XOR<OrderStatusLogUpdateWithoutOrderInput, OrderStatusLogUncheckedUpdateWithoutOrderInput>
  }

  export type OrderStatusLogUpdateManyWithWhereWithoutOrderInput = {
    where: OrderStatusLogScalarWhereInput
    data: XOR<OrderStatusLogUpdateManyMutationInput, OrderStatusLogUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderStatusLogScalarWhereInput = {
    AND?: OrderStatusLogScalarWhereInput | OrderStatusLogScalarWhereInput[]
    OR?: OrderStatusLogScalarWhereInput[]
    NOT?: OrderStatusLogScalarWhereInput | OrderStatusLogScalarWhereInput[]
    id?: StringFilter<"OrderStatusLog"> | string
    orderId?: StringFilter<"OrderStatusLog"> | string
    status?: EnumOrderStatusFilter<"OrderStatusLog"> | $Enums.OrderStatus
    note?: StringNullableFilter<"OrderStatusLog"> | string | null
    createdAt?: DateTimeFilter<"OrderStatusLog"> | Date | string
  }

  export type RiderUpsertWithoutOrdersInput = {
    update: XOR<RiderUpdateWithoutOrdersInput, RiderUncheckedUpdateWithoutOrdersInput>
    create: XOR<RiderCreateWithoutOrdersInput, RiderUncheckedCreateWithoutOrdersInput>
    where?: RiderWhereInput
  }

  export type RiderUpdateToOneWithWhereWithoutOrdersInput = {
    where?: RiderWhereInput
    data: XOR<RiderUpdateWithoutOrdersInput, RiderUncheckedUpdateWithoutOrdersInput>
  }

  export type RiderUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RiderUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateWithoutStatusHistoryInput = {
    id?: string
    reference: string
    idempotencyKey?: string | null
    sellerId?: string | null
    email: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: string
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fulfillmentStatus?: $Enums.OrderStatus
    customerName?: string | null
    customerPhone?: string | null
    customerAddress?: string | null
    riderName?: string | null
    riderPhone?: string | null
    assignedAt?: Date | string | null
    pickedUpAt?: Date | string | null
    deliveredAt?: Date | string | null
    estimatedTime?: number | null
    adminNotes?: string | null
    notificationSent?: boolean
    items?: OrderItemCreateNestedManyWithoutOrderInput
    payment?: PaymentTransactionCreateNestedOneWithoutOrderInput
    rider?: RiderCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutStatusHistoryInput = {
    id?: string
    reference: string
    idempotencyKey?: string | null
    sellerId?: string | null
    email: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: string
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fulfillmentStatus?: $Enums.OrderStatus
    customerName?: string | null
    customerPhone?: string | null
    customerAddress?: string | null
    riderId?: string | null
    riderName?: string | null
    riderPhone?: string | null
    assignedAt?: Date | string | null
    pickedUpAt?: Date | string | null
    deliveredAt?: Date | string | null
    estimatedTime?: number | null
    adminNotes?: string | null
    notificationSent?: boolean
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    payment?: PaymentTransactionUncheckedCreateNestedOneWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutStatusHistoryInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutStatusHistoryInput, OrderUncheckedCreateWithoutStatusHistoryInput>
  }

  export type OrderUpsertWithoutStatusHistoryInput = {
    update: XOR<OrderUpdateWithoutStatusHistoryInput, OrderUncheckedUpdateWithoutStatusHistoryInput>
    create: XOR<OrderCreateWithoutStatusHistoryInput, OrderUncheckedCreateWithoutStatusHistoryInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutStatusHistoryInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutStatusHistoryInput, OrderUncheckedUpdateWithoutStatusHistoryInput>
  }

  export type OrderUpdateWithoutStatusHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fulfillmentStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    riderName?: NullableStringFieldUpdateOperationsInput | string | null
    riderPhone?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickedUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    payment?: PaymentTransactionUpdateOneWithoutOrderNestedInput
    rider?: RiderUpdateOneWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutStatusHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fulfillmentStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    riderId?: NullableStringFieldUpdateOperationsInput | string | null
    riderName?: NullableStringFieldUpdateOperationsInput | string | null
    riderPhone?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickedUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    payment?: PaymentTransactionUncheckedUpdateOneWithoutOrderNestedInput
  }

  export type OrderCreateWithoutRiderInput = {
    id?: string
    reference: string
    idempotencyKey?: string | null
    sellerId?: string | null
    email: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: string
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fulfillmentStatus?: $Enums.OrderStatus
    customerName?: string | null
    customerPhone?: string | null
    customerAddress?: string | null
    riderName?: string | null
    riderPhone?: string | null
    assignedAt?: Date | string | null
    pickedUpAt?: Date | string | null
    deliveredAt?: Date | string | null
    estimatedTime?: number | null
    adminNotes?: string | null
    notificationSent?: boolean
    items?: OrderItemCreateNestedManyWithoutOrderInput
    payment?: PaymentTransactionCreateNestedOneWithoutOrderInput
    statusHistory?: OrderStatusLogCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutRiderInput = {
    id?: string
    reference: string
    idempotencyKey?: string | null
    sellerId?: string | null
    email: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: string
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fulfillmentStatus?: $Enums.OrderStatus
    customerName?: string | null
    customerPhone?: string | null
    customerAddress?: string | null
    riderName?: string | null
    riderPhone?: string | null
    assignedAt?: Date | string | null
    pickedUpAt?: Date | string | null
    deliveredAt?: Date | string | null
    estimatedTime?: number | null
    adminNotes?: string | null
    notificationSent?: boolean
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    payment?: PaymentTransactionUncheckedCreateNestedOneWithoutOrderInput
    statusHistory?: OrderStatusLogUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutRiderInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutRiderInput, OrderUncheckedCreateWithoutRiderInput>
  }

  export type OrderCreateManyRiderInputEnvelope = {
    data: OrderCreateManyRiderInput | OrderCreateManyRiderInput[]
    skipDuplicates?: boolean
  }

  export type OrderUpsertWithWhereUniqueWithoutRiderInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutRiderInput, OrderUncheckedUpdateWithoutRiderInput>
    create: XOR<OrderCreateWithoutRiderInput, OrderUncheckedCreateWithoutRiderInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutRiderInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutRiderInput, OrderUncheckedUpdateWithoutRiderInput>
  }

  export type OrderUpdateManyWithWhereWithoutRiderInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutRiderInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: StringFilter<"Order"> | string
    reference?: StringFilter<"Order"> | string
    idempotencyKey?: StringNullableFilter<"Order"> | string | null
    sellerId?: StringNullableFilter<"Order"> | string | null
    email?: StringFilter<"Order"> | string
    amount?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Order"> | string
    status?: StringFilter<"Order"> | string
    paidAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    fulfillmentStatus?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    customerName?: StringNullableFilter<"Order"> | string | null
    customerPhone?: StringNullableFilter<"Order"> | string | null
    customerAddress?: StringNullableFilter<"Order"> | string | null
    riderId?: StringNullableFilter<"Order"> | string | null
    riderName?: StringNullableFilter<"Order"> | string | null
    riderPhone?: StringNullableFilter<"Order"> | string | null
    assignedAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    pickedUpAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    deliveredAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    estimatedTime?: IntNullableFilter<"Order"> | number | null
    adminNotes?: StringNullableFilter<"Order"> | string | null
    notificationSent?: BoolFilter<"Order"> | boolean
  }

  export type OrderCreateWithoutItemsInput = {
    id?: string
    reference: string
    idempotencyKey?: string | null
    sellerId?: string | null
    email: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: string
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fulfillmentStatus?: $Enums.OrderStatus
    customerName?: string | null
    customerPhone?: string | null
    customerAddress?: string | null
    riderName?: string | null
    riderPhone?: string | null
    assignedAt?: Date | string | null
    pickedUpAt?: Date | string | null
    deliveredAt?: Date | string | null
    estimatedTime?: number | null
    adminNotes?: string | null
    notificationSent?: boolean
    payment?: PaymentTransactionCreateNestedOneWithoutOrderInput
    statusHistory?: OrderStatusLogCreateNestedManyWithoutOrderInput
    rider?: RiderCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutItemsInput = {
    id?: string
    reference: string
    idempotencyKey?: string | null
    sellerId?: string | null
    email: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: string
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fulfillmentStatus?: $Enums.OrderStatus
    customerName?: string | null
    customerPhone?: string | null
    customerAddress?: string | null
    riderId?: string | null
    riderName?: string | null
    riderPhone?: string | null
    assignedAt?: Date | string | null
    pickedUpAt?: Date | string | null
    deliveredAt?: Date | string | null
    estimatedTime?: number | null
    adminNotes?: string | null
    notificationSent?: boolean
    payment?: PaymentTransactionUncheckedCreateNestedOneWithoutOrderInput
    statusHistory?: OrderStatusLogUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutItemsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
  }

  export type ProductCreateWithoutOrderItemsInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    category?: string | null
    sku?: string | null
    price: Decimal | DecimalJsLike | number | string
    quantity?: number
    lowStock?: number | null
    dosage?: string | null
    dosageGuide?: NullableJsonNullValueInput | InputJsonValue
    manufacturer?: string | null
    expiryDate?: Date | string | null
    imageUrl?: string | null
    prescriptionRequired?: boolean
    activeListing?: boolean
    isFeatured?: boolean
    featuredRank?: number | null
    createAt?: Date | string
    updateAt?: Date | string
  }

  export type ProductUncheckedCreateWithoutOrderItemsInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    category?: string | null
    sku?: string | null
    price: Decimal | DecimalJsLike | number | string
    quantity?: number
    lowStock?: number | null
    dosage?: string | null
    dosageGuide?: NullableJsonNullValueInput | InputJsonValue
    manufacturer?: string | null
    expiryDate?: Date | string | null
    imageUrl?: string | null
    prescriptionRequired?: boolean
    activeListing?: boolean
    isFeatured?: boolean
    featuredRank?: number | null
    createAt?: Date | string
    updateAt?: Date | string
  }

  export type ProductCreateOrConnectWithoutOrderItemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
  }

  export type OrderUpsertWithoutItemsInput = {
    update: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type OrderUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fulfillmentStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    riderName?: NullableStringFieldUpdateOperationsInput | string | null
    riderPhone?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickedUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    payment?: PaymentTransactionUpdateOneWithoutOrderNestedInput
    statusHistory?: OrderStatusLogUpdateManyWithoutOrderNestedInput
    rider?: RiderUpdateOneWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fulfillmentStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    riderId?: NullableStringFieldUpdateOperationsInput | string | null
    riderName?: NullableStringFieldUpdateOperationsInput | string | null
    riderPhone?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickedUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    payment?: PaymentTransactionUncheckedUpdateOneWithoutOrderNestedInput
    statusHistory?: OrderStatusLogUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type ProductUpsertWithoutOrderItemsInput = {
    update: XOR<ProductUpdateWithoutOrderItemsInput, ProductUncheckedUpdateWithoutOrderItemsInput>
    create: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutOrderItemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutOrderItemsInput, ProductUncheckedUpdateWithoutOrderItemsInput>
  }

  export type ProductUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    lowStock?: NullableIntFieldUpdateOperationsInput | number | null
    dosage?: NullableStringFieldUpdateOperationsInput | string | null
    dosageGuide?: NullableJsonNullValueInput | InputJsonValue
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    prescriptionRequired?: BoolFieldUpdateOperationsInput | boolean
    activeListing?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    featuredRank?: NullableIntFieldUpdateOperationsInput | number | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    sku?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    lowStock?: NullableIntFieldUpdateOperationsInput | number | null
    dosage?: NullableStringFieldUpdateOperationsInput | string | null
    dosageGuide?: NullableJsonNullValueInput | InputJsonValue
    manufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    prescriptionRequired?: BoolFieldUpdateOperationsInput | boolean
    activeListing?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    featuredRank?: NullableIntFieldUpdateOperationsInput | number | null
    createAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateWithoutPaymentInput = {
    id?: string
    reference: string
    idempotencyKey?: string | null
    sellerId?: string | null
    email: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: string
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fulfillmentStatus?: $Enums.OrderStatus
    customerName?: string | null
    customerPhone?: string | null
    customerAddress?: string | null
    riderName?: string | null
    riderPhone?: string | null
    assignedAt?: Date | string | null
    pickedUpAt?: Date | string | null
    deliveredAt?: Date | string | null
    estimatedTime?: number | null
    adminNotes?: string | null
    notificationSent?: boolean
    items?: OrderItemCreateNestedManyWithoutOrderInput
    statusHistory?: OrderStatusLogCreateNestedManyWithoutOrderInput
    rider?: RiderCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutPaymentInput = {
    id?: string
    reference: string
    idempotencyKey?: string | null
    sellerId?: string | null
    email: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: string
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fulfillmentStatus?: $Enums.OrderStatus
    customerName?: string | null
    customerPhone?: string | null
    customerAddress?: string | null
    riderId?: string | null
    riderName?: string | null
    riderPhone?: string | null
    assignedAt?: Date | string | null
    pickedUpAt?: Date | string | null
    deliveredAt?: Date | string | null
    estimatedTime?: number | null
    adminNotes?: string | null
    notificationSent?: boolean
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    statusHistory?: OrderStatusLogUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutPaymentInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutPaymentInput, OrderUncheckedCreateWithoutPaymentInput>
  }

  export type OrderUpsertWithoutPaymentInput = {
    update: XOR<OrderUpdateWithoutPaymentInput, OrderUncheckedUpdateWithoutPaymentInput>
    create: XOR<OrderCreateWithoutPaymentInput, OrderUncheckedCreateWithoutPaymentInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutPaymentInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutPaymentInput, OrderUncheckedUpdateWithoutPaymentInput>
  }

  export type OrderUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fulfillmentStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    riderName?: NullableStringFieldUpdateOperationsInput | string | null
    riderPhone?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickedUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    statusHistory?: OrderStatusLogUpdateManyWithoutOrderNestedInput
    rider?: RiderUpdateOneWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fulfillmentStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    riderId?: NullableStringFieldUpdateOperationsInput | string | null
    riderName?: NullableStringFieldUpdateOperationsInput | string | null
    riderPhone?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickedUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    statusHistory?: OrderStatusLogUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type SupportMessageCreateWithoutConversationInput = {
    id?: string
    content: string
    senderType: $Enums.SenderType
    senderName: string
    createdAt?: Date | string
    isRead?: boolean
    messageType?: $Enums.MessageType
    productId?: string | null
    productName?: string | null
    productPrice?: number | null
    productImage?: string | null
  }

  export type SupportMessageUncheckedCreateWithoutConversationInput = {
    id?: string
    content: string
    senderType: $Enums.SenderType
    senderName: string
    createdAt?: Date | string
    isRead?: boolean
    messageType?: $Enums.MessageType
    productId?: string | null
    productName?: string | null
    productPrice?: number | null
    productImage?: string | null
  }

  export type SupportMessageCreateOrConnectWithoutConversationInput = {
    where: SupportMessageWhereUniqueInput
    create: XOR<SupportMessageCreateWithoutConversationInput, SupportMessageUncheckedCreateWithoutConversationInput>
  }

  export type SupportMessageCreateManyConversationInputEnvelope = {
    data: SupportMessageCreateManyConversationInput | SupportMessageCreateManyConversationInput[]
    skipDuplicates?: boolean
  }

  export type SupportMessageUpsertWithWhereUniqueWithoutConversationInput = {
    where: SupportMessageWhereUniqueInput
    update: XOR<SupportMessageUpdateWithoutConversationInput, SupportMessageUncheckedUpdateWithoutConversationInput>
    create: XOR<SupportMessageCreateWithoutConversationInput, SupportMessageUncheckedCreateWithoutConversationInput>
  }

  export type SupportMessageUpdateWithWhereUniqueWithoutConversationInput = {
    where: SupportMessageWhereUniqueInput
    data: XOR<SupportMessageUpdateWithoutConversationInput, SupportMessageUncheckedUpdateWithoutConversationInput>
  }

  export type SupportMessageUpdateManyWithWhereWithoutConversationInput = {
    where: SupportMessageScalarWhereInput
    data: XOR<SupportMessageUpdateManyMutationInput, SupportMessageUncheckedUpdateManyWithoutConversationInput>
  }

  export type SupportMessageScalarWhereInput = {
    AND?: SupportMessageScalarWhereInput | SupportMessageScalarWhereInput[]
    OR?: SupportMessageScalarWhereInput[]
    NOT?: SupportMessageScalarWhereInput | SupportMessageScalarWhereInput[]
    id?: StringFilter<"SupportMessage"> | string
    conversationId?: StringFilter<"SupportMessage"> | string
    content?: StringFilter<"SupportMessage"> | string
    senderType?: EnumSenderTypeFilter<"SupportMessage"> | $Enums.SenderType
    senderName?: StringFilter<"SupportMessage"> | string
    createdAt?: DateTimeFilter<"SupportMessage"> | Date | string
    isRead?: BoolFilter<"SupportMessage"> | boolean
    messageType?: EnumMessageTypeFilter<"SupportMessage"> | $Enums.MessageType
    productId?: StringNullableFilter<"SupportMessage"> | string | null
    productName?: StringNullableFilter<"SupportMessage"> | string | null
    productPrice?: FloatNullableFilter<"SupportMessage"> | number | null
    productImage?: StringNullableFilter<"SupportMessage"> | string | null
  }

  export type SupportConversationCreateWithoutMessagesInput = {
    id?: string
    userId?: string | null
    guestName?: string | null
    guestPhone?: string | null
    status?: $Enums.ConversationStatus
    subject?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastMessageAt?: Date | string
    pharmacistId?: string | null
    isRead?: boolean
  }

  export type SupportConversationUncheckedCreateWithoutMessagesInput = {
    id?: string
    userId?: string | null
    guestName?: string | null
    guestPhone?: string | null
    status?: $Enums.ConversationStatus
    subject?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastMessageAt?: Date | string
    pharmacistId?: string | null
    isRead?: boolean
  }

  export type SupportConversationCreateOrConnectWithoutMessagesInput = {
    where: SupportConversationWhereUniqueInput
    create: XOR<SupportConversationCreateWithoutMessagesInput, SupportConversationUncheckedCreateWithoutMessagesInput>
  }

  export type SupportConversationUpsertWithoutMessagesInput = {
    update: XOR<SupportConversationUpdateWithoutMessagesInput, SupportConversationUncheckedUpdateWithoutMessagesInput>
    create: XOR<SupportConversationCreateWithoutMessagesInput, SupportConversationUncheckedCreateWithoutMessagesInput>
    where?: SupportConversationWhereInput
  }

  export type SupportConversationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: SupportConversationWhereInput
    data: XOR<SupportConversationUpdateWithoutMessagesInput, SupportConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type SupportConversationUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    guestName?: NullableStringFieldUpdateOperationsInput | string | null
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumConversationStatusFieldUpdateOperationsInput | $Enums.ConversationStatus
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pharmacistId?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SupportConversationUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    guestName?: NullableStringFieldUpdateOperationsInput | string | null
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumConversationStatusFieldUpdateOperationsInput | $Enums.ConversationStatus
    subject?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pharmacistId?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrderItemCreateManyProductInput = {
    id?: string
    orderId: string
    name: string
    unitPrice: Decimal | DecimalJsLike | number | string
    quantity: number
    lineTotal: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    category?: string | null
  }

  export type OrderItemUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    lineTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    lineTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    lineTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemCreateManyOrderInput = {
    id?: string
    productId: string
    name: string
    unitPrice: Decimal | DecimalJsLike | number | string
    quantity: number
    lineTotal: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    category?: string | null
  }

  export type OrderStatusLogCreateManyOrderInput = {
    id?: string
    status: $Enums.OrderStatus
    note?: string | null
    createdAt?: Date | string
  }

  export type OrderItemUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    lineTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    lineTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    lineTotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderStatusLogUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderStatusLogUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderStatusLogUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateManyRiderInput = {
    id?: string
    reference: string
    idempotencyKey?: string | null
    sellerId?: string | null
    email: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    status?: string
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fulfillmentStatus?: $Enums.OrderStatus
    customerName?: string | null
    customerPhone?: string | null
    customerAddress?: string | null
    riderName?: string | null
    riderPhone?: string | null
    assignedAt?: Date | string | null
    pickedUpAt?: Date | string | null
    deliveredAt?: Date | string | null
    estimatedTime?: number | null
    adminNotes?: string | null
    notificationSent?: boolean
  }

  export type OrderUpdateWithoutRiderInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fulfillmentStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    riderName?: NullableStringFieldUpdateOperationsInput | string | null
    riderPhone?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickedUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    payment?: PaymentTransactionUpdateOneWithoutOrderNestedInput
    statusHistory?: OrderStatusLogUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutRiderInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fulfillmentStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    riderName?: NullableStringFieldUpdateOperationsInput | string | null
    riderPhone?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickedUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    payment?: PaymentTransactionUncheckedUpdateOneWithoutOrderNestedInput
    statusHistory?: OrderStatusLogUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutRiderInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    sellerId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fulfillmentStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerAddress?: NullableStringFieldUpdateOperationsInput | string | null
    riderName?: NullableStringFieldUpdateOperationsInput | string | null
    riderPhone?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pickedUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedTime?: NullableIntFieldUpdateOperationsInput | number | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SupportMessageCreateManyConversationInput = {
    id?: string
    content: string
    senderType: $Enums.SenderType
    senderName: string
    createdAt?: Date | string
    isRead?: boolean
    messageType?: $Enums.MessageType
    productId?: string | null
    productName?: string | null
    productPrice?: number | null
    productImage?: string | null
  }

  export type SupportMessageUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    senderType?: EnumSenderTypeFieldUpdateOperationsInput | $Enums.SenderType
    senderName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    messageType?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    productName?: NullableStringFieldUpdateOperationsInput | string | null
    productPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SupportMessageUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    senderType?: EnumSenderTypeFieldUpdateOperationsInput | $Enums.SenderType
    senderName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    messageType?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    productName?: NullableStringFieldUpdateOperationsInput | string | null
    productPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SupportMessageUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    senderType?: EnumSenderTypeFieldUpdateOperationsInput | $Enums.SenderType
    senderName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    messageType?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    productName?: NullableStringFieldUpdateOperationsInput | string | null
    productPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
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