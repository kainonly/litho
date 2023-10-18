import os
import json
from qcloud_cos import CosConfig, CosS3Client
from tencentcloud.common import credential
from tencentcloud.common.profile.client_profile import ClientProfile
from tencentcloud.common.profile.http_profile import HttpProfile
from tencentcloud.cdn.v20180606 import cdn_client, models

secret_id = os.environ['COS_SECRET_ID']
secret_key = os.environ['COS_SECRET_KEY']
bucket = os.environ['COS_BUCKET']
region = 'ap-guangzhou'

config = CosConfig(
    Region=region,
    SecretId=secret_id,
    SecretKey=secret_key
)
client = CosS3Client(config)

marker = ""
while True:
    response = client.list_objects(
        Bucket=bucket,
        Marker=marker
    )

    if 'Contents' in response.keys():
        objects = map(lambda v: {'Key': v['Key']}, response['Contents'])
        client.delete_objects(
            Bucket=bucket,
            Delete={
                'Object': list(objects),
                'Quiet': 'true'
            }
        )

    if response['IsTruncated'] == 'false':
        break

    marker = response['NextMarker']

print('COS: Clear OK!')

for root, _, files in os.walk('dist/console/browser'):
    for file in files:
        local = os.path.join(root, file).replace('\\', '/')
        key = local.replace('dist/console/browser/', '')
        client.upload_file(
            Bucket=bucket,
            LocalFilePath=local,
            Key=key
        )
        print('COS: Send <' + key + '> OK')

print('COS: Sync OK')

cred = credential.Credential(secret_id, secret_key)
httpProfile = HttpProfile()
httpProfile.endpoint = "cdn.tencentcloudapi.com"

clientProfile = ClientProfile()
clientProfile.httpProfile = httpProfile
client = cdn_client.CdnClient(cred, "", clientProfile)

req = models.PurgePathCacheRequest()
params = {
    'Paths': ["https://console.kainonly.com/"],
    'FlushType': "flush"
}
req.from_json_string(json.dumps(params))
client.PurgePathCache(req)

print('CDN: Refresh OK')
