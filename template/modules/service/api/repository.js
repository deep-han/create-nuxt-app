/*
 * @Author: Han 
 * @Date: 2020-01-13 17:22:51 
 * @Last Modified by: Han
 * @Last Modified time: 2020-01-14 10:01:41
 */

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
  uri() {
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
  create($axios) {
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
  show($axios) {
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
  index($axios) {
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
  update($axios) {
    return (id, payload, ...args) => $axios.$put(`${this.uri()}/${id}`, payload, ...args)
  }

  /**
   *Delete a resource by id
   * @public
   * @override
   * @param {@nuxtjs/axios} $axios
   * @returns {Function}
   * @memberof Repository
   */
  delete($axios) {
    return (id, ...args) => $axios.$delete(`${this.uri()}/${id}`, ...args)
  }

  /**
   *Init such a interface for developer
   * @private
   * @param {@nuxtjs/axios} $axios
   * @returns {Object}
   * @memberof Repository
   */
  init($axios) {
    return {
      // uri 用于 el-data-table 等组件
      uri: this.uri.bind(this),
      create: this.create($axios),
      show: this.show($axios),
      index: this.index($axios),
      update: this.update($axios),
      delete: this.delete($axios)
    }
  }
}

export class ElementRepository extends Repository {
  constructor(resource, id) {
    super(resource)
    this.id = id
  }

  uri(appId) {
    return `${this.resource}/status/${this.id}?appId=${appId}`
  }

  update($axios) {
    return (appId, payload, ...args) => $axios.$post(`${this.uri(appId)}`, payload, ...args)
  }
}
