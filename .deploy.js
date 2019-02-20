/**
 * 部署配置
 * @author Philip
 */

module.exports = {
  name: 'raddeana',
  dist: 'dist',
  type: 'web',
  build: 'build/build.js',
  ali_oss: {
    accessKeyId: 'LTAI2PBQSdfLOUme',
    accessKeySecret: 'uMuFXEuK06PGTEmHRiFCvoCNtgx8nb',
    bucket: 'raddeana',
    region: 'oss-cn-hangzhou'
  }
}
