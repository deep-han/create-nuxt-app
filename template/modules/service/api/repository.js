/*
 * @Author: Han
 * @Date: 2020-01-13 17:22:51
 * @Last Modified by: Han
 * @Last Modified time: 2020-01-16 18:04:58
 */

const RepositoryInterface = {
  URI: 'uri',
  CREATE: 'create',
  LIST: 'list',
  DETAIL: 'detail',
  UPDATE: 'update',
  DELETE: 'delete',
}

/**
 * 作为 service 层 API 的基类
 * 基于 RESTful 定义对统一资源的 CRUD 接口
 * @export
 * @class Repository
 */
export class Repository {
  /**
   *Creates an instance of Repository.
   * @param {*} resource
   * @memberof Repository
   */
  constructor(resource) {
    this.resource = resource
  }

  /**
   * @public
   * @override
   * @param {@nuxtjs/axios} $axios
   * @returns {String} API Uri
   * @memberof Repository
   */
  [RepositoryInterface.URI]() {
    return this.resource
  }

  /**
   *Create a resource
   * @public
   * @override
   * @param {@nuxtjs/axios} $axios
   * @returns function
   * @memberof Repository
   */
  [RepositoryInterface.CREATE]($axios) {
    return (payload, ...args) => $axios.$post(this.uri(), payload, ...args)
  }

  /**
   *Get a resource by id
   * @public
   * @override
   * @param {@nuxtjs/axios} $axios
   * @returns function
   * @memberof Repository
   */
  [RepositoryInterface.DETAIL]($axios) {
    return (id, ...args) => $axios.$get(`${this.uri()}/${id}`, ...args)
  }

  /**
   *Get the list of kind of resource
   * @public
   * @override
   * @param {@nuxtjs/axios} $axios
   * @returns function
   * @memberof Repository
   */
  [RepositoryInterface.LIST]($axios) {
    return (...args) => $axios.$get(this.uri(), ...args)
  }

  /**
   *Update a resource
   * @public
   * @override
   * @param {@nuxtjs/axios} $axios
   * @returns function
   * @memberof Repository
   */
  [RepositoryInterface.UPDATE]($axios) {
    return (id, payload, ...args) =>
      $axios.$put(`${this.uri()}/${id}`, payload, ...args)
  }

  /**
   *Delete a resource by id
   * @public
   * @override
   * @param {@nuxtjs/axios} $axios
   * @returns {Function}
   * @memberof Repository
   */
  [RepositoryInterface.DELETE]($axios) {
    return (id, ...args) => $axios.$delete(`${this.uri()}/${id}`, ...args)
  }

  /**
   *Init such a interface for developer
   * 不建议外部覆盖此方法，为了保证调用者，可以使用统一的 API 调用方法。
   * @private
   * @param {@nuxtjs/axios} $axios
   * @returns {Object}
   * @memberof Repository
   */
  init($axios) {
    // bind this 是为了继承 Repository 的属性方法，方便扩展
    return {
      [RepositoryInterface.URI]: this[RepositoryInterface.URI].bind(this),
      [RepositoryInterface.CREATE]: this[RepositoryInterface.CREATE](
        $axios,
      ).bind(this),
      [RepositoryInterface.DETAIL]: this[RepositoryInterface.DETAIL](
        $axios,
      ).bind(this),
      [RepositoryInterface.LIST]: this[RepositoryInterface.LIST]($axios).bind(
        this,
      ),
      [RepositoryInterface.DELETE]: this[RepositoryInterface.DELETE](
        $axios,
      ).bind(this),
      [RepositoryInterface.UPDATE]: this[RepositoryInterface.UPDATE](
        $axios,
      ).bind(this),
    }
  }
}

/**
 *可以通过继承 Repository 来实现不满足 RESTful 最佳实践的接口
 *这是一个例子, 接口的 query 上必须带 appId，接口的设计包含多个主从 id 等
 * @export
 * @class ExampleRepository
 * @extends {Repository}
 */
export class ExampleRepository extends Repository {
  constructor(resource, id) {
    super(resource)
    this.id = id
  }

  uri(appId) {
    return `${this.resource}/status/${this.id}?appId=${appId}`
  }

  update($axios) {
    return (appId, payload, ...args) =>
      $axios.$post(`${this.uri(appId)}`, payload, ...args)
  }
}
