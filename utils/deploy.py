import os
import json
from qcloud_cos import CosConfig, CosS3Client
from tencentcloud.common import credential
from tencentcloud.common.profile.client_profile import ClientProfile
from tencentcloud.common.profile.http_profile import HttpProfile
from tencentcloud.cdn.v20180606 import cdn_client, models

project = 'ngx-bit-case'

with open('deploy.json') as f:
  deploy = json.loads(f.read())

config = CosConfig(
  Region=deploy['region'],
  SecretId=deploy['secretId'],
  SecretKey=deploy['secretKey']
)
client = CosS3Client(config)

marker = ""
while True:
  response = client.list_objects(
    Bucket=deploy['bucket'],
    Marker=marker
  )

  if 'Contents' in response.keys():
    objects = map(lambda v: {'Key': v['Key']}, response['Contents'])
    client.delete_objects(
      Bucket=deploy['bucket'],
      Delete={
        'Object': list(objects),
        'Quiet': 'true'
      }
    )

  if response['IsTruncated'] == 'false':
    break

  marker = response['NextMarker']

print('COS Clear')

for root, dir, files in os.walk('dist/' + project):
  for file in files:
    local = os.path.join(root, file).replace('\\', '/')
    key = local.replace('dist/' + project + '/', '')
    client.upload_file(
      Bucket=deploy['bucket'],
      LocalFilePath=local,
      Key=key
    )
    print('<' + key + '> Upload Successed')

print('Complete')

# CDN内容分发工作流程
cred = credential.Credential(deploy['secretId'], deploy['secretKey'])
httpProfile = HttpProfile()
httpProfile.endpoint = "cdn.tencentcloudapi.com"

clientProfile = ClientProfile()
clientProfile.httpProfile = httpProfile
client = cdn_client.CdnClient(cred, "", clientProfile)

req = models.PurgePathCacheRequest()
params = {
  'Paths': [deploy['cdn']],
  'FlushType': "flush"
}
req.from_json_string(json.dumps(params))
client.PurgePathCache(req)

print('CDN Refresh Successed')
