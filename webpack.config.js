/**
 * Created by luxiaolong on 2017/6/16.
 */

module.exports = function(env) {
    return require(`./webpack.${env}.js`)
}