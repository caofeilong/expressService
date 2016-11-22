Promise = require 'bluebird'

pools = require "./pools"


connWrapper = (conn) ->
  Promise.promisifyAll conn
  query: () ->
    conn.queryAsync arguments...
  beginTransaction: () ->
    conn.beginTransaction

  commit: () ->
    conn.commitAsync

  rollback: () ->
    conn.rollbackAsync

  release: () -> conn.release()


poolWrapper = (pool) ->
  Promise.promisifyAll pool
  query: () ->
    pool.queryAsync arguments...

  find: (sql, values) ->
    @query sql, values
    .then (rows) ->
      return rows

  findOne: (sql, values) ->
    @find sql, values
    .then (rows) ->
      return rows?[0]
  getConnection: () ->
    pool.getConnectionAsync

  transaction: (handler) ->
    @getConnection()
    .then (conn) ->
      connWrapper conn
    .then (conn) ->
# conn is a wrapper with promise
      conn.beginTransaction()
      .then () ->
        handler conn
      .then () ->
        conn.commit()
      .catch (err) ->
        conn.rollback()
        throw err
      .finally () ->
        conn.release()

module.exports = exports = (name) ->
  poolWrapper pools.getPool name
