export interface RedisRepositoryPort {
    set(key:string , value:string , ttl?:number) : Promise<void>
    get(key:string) : Promise<string | null>
    del(key:string) : Promise<boolean>
    exists(key: string): Promise<boolean>
}

export const REDIS_REPOSITORY = Symbol('REDIS_REPOSITORY')
