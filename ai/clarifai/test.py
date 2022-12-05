########################################################################################
# In this section, we set the user authentication, app ID, model details, and the URL
# of the image we want as an input. Change these strings to run your own example.
#######################################################################################

USER_ID = 'sw133v'
# Your PAT (Personal Access Token) can be found in the portal under Authentification
PAT = 'bc82887e95dc4b4bb2ad205febd2362d'
APP_ID = 'image_recog'
# Change these to whatever model and image URL you want to use
MODEL_ID = 'general-image-recognition'
# IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg'
IMAGE_URL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6SUuLwyk9wFKZDYsgdSahYs7HEf.jpg'
IMAGE_FILE_LOCATION = './HKPU_04_04_pic1.jpg'
# This is optional. You can specify a model version or the empty string for the default
MODEL_VERSION_ID = ''

############################################################################
# YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
############################################################################

from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from clarifai_grpc.grpc.api import resources_pb2, service_pb2, service_pb2_grpc
from clarifai_grpc.grpc.api.status import status_code_pb2

channel = ClarifaiChannel.get_grpc_channel()
stub = service_pb2_grpc.V2Stub(channel)
#모듈 불러오는 부분

metadata = (('authorization', 'Key ' + PAT),)


userDataObject = resources_pb2.UserAppIDSet(user_id=USER_ID, app_id=APP_ID)

# # 이미지를 url로 받을때
# post_model_outputs_response = stub.PostModelOutputs(
#     service_pb2.PostModelOutputsRequest(
#         user_app_id=userDataObject,  # The userDataObject is created in the overview and is required when using a PAT
#         model_id=MODEL_ID,
#         version_id=MODEL_VERSION_ID,  # This is optional. Defaults to the latest model version
#         inputs=[
#             resources_pb2.Input(
#                 data=resources_pb2.Data(
#                     image=resources_pb2.Image(
#                         url=IMAGE_URL
#                     )
#                 )
#             )
#         ]
#     ),
#     metadata=metadata
# )

# 이미지를 static 하게 받아 올때
with open(IMAGE_FILE_LOCATION, "rb") as f:
    file_bytes = f.read()

post_model_outputs_response = stub.PostModelOutputs(
    service_pb2.PostModelOutputsRequest(
        user_app_id=userDataObject,  # The userDataObject is created in the overview and is required when using a PAT
        model_id=MODEL_ID,
        version_id=MODEL_VERSION_ID,  # This is optional. Defaults to the latest model version
        inputs=[
            resources_pb2.Input(
                data=resources_pb2.Data(
                    image=resources_pb2.Image(
                        base64=file_bytes
                    )
                )
            )
        ]
    ),
    metadata=metadata
)

if post_model_outputs_response.status.code != status_code_pb2.SUCCESS:
    print(post_model_outputs_response.status)
    raise Exception("Post model outputs failed, status: " + post_model_outputs_response.status.description)

# Since we have one input, one output will exist here
output = post_model_outputs_response.outputs[0]

print("Predicted concepts:")
ansList = []
for concept in output.data.concepts:
    # print("%s %.2f" % (concept.name, concept.value))
    ansList.append("%s" % concept.name)

# Uncomment this line to print the full Response JSON
# print(output)
print(ansList)