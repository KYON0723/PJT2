# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: proto/clarifai/api/status/status.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from clarifai_grpc.grpc.auth.util import extension_pb2 as proto_dot_clarifai_dot_auth_dot_util_dot_extension__pb2
from clarifai_grpc.grpc.api.status import status_code_pb2 as proto_dot_clarifai_dot_api_dot_status_dot_status__code__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n&proto/clarifai/api/status/status.proto\x12\x13\x63larifai.api.status\x1a(proto/clarifai/auth/util/extension.proto\x1a+proto/clarifai/api/status/status_code.proto\"\x9b\x02\n\x06Status\x12-\n\x04\x63ode\x18\x01 \x01(\x0e\x32\x1f.clarifai.api.status.StatusCode\x12\x13\n\x0b\x64\x65scription\x18\x02 \x01(\t\x12\x0f\n\x07\x64\x65tails\x18\x03 \x01(\t\x12\x19\n\x0bstack_trace\x18\x04 \x03(\tB\x04\x80\x9c\'\x01\x12\x19\n\x11percent_completed\x18\x05 \x01(\r\x12\x16\n\x0etime_remaining\x18\x06 \x01(\r\x12\x0e\n\x06req_id\x18\x07 \x01(\t\x12\x1e\n\x10internal_details\x18\x08 \x01(\tB\x04\x80\x9c\'\x01\x12>\n\rredirect_info\x18\t \x01(\x0b\x32!.clarifai.api.status.RedirectInfoB\x04\x80\x9c\'\x01\"d\n\x0cRedirectInfo\x12\x0b\n\x03url\x18\x01 \x01(\t\x12\x15\n\rresource_type\x18\x02 \x01(\t\x12\x17\n\x0fold_resource_id\x18\x03 \x01(\t\x12\x17\n\x0fnew_resource_id\x18\x04 \x01(\t\";\n\x0c\x42\x61seResponse\x12+\n\x06status\x18\x01 \x01(\x0b\x32\x1b.clarifai.api.status.StatusBg\n\x1c\x63om.clarifai.grpc.api.statusP\x01Z>github.com/Clarifai/clarifai-go-grpc/proto/clarifai/api/status\xa2\x02\x04\x43\x41IPb\x06proto3')



_STATUS = DESCRIPTOR.message_types_by_name['Status']
_REDIRECTINFO = DESCRIPTOR.message_types_by_name['RedirectInfo']
_BASERESPONSE = DESCRIPTOR.message_types_by_name['BaseResponse']
Status = _reflection.GeneratedProtocolMessageType('Status', (_message.Message,), {
  'DESCRIPTOR' : _STATUS,
  '__module__' : 'proto.clarifai.api.status.status_pb2'
  # @@protoc_insertion_point(class_scope:clarifai.api.status.Status)
  })
_sym_db.RegisterMessage(Status)

RedirectInfo = _reflection.GeneratedProtocolMessageType('RedirectInfo', (_message.Message,), {
  'DESCRIPTOR' : _REDIRECTINFO,
  '__module__' : 'proto.clarifai.api.status.status_pb2'
  # @@protoc_insertion_point(class_scope:clarifai.api.status.RedirectInfo)
  })
_sym_db.RegisterMessage(RedirectInfo)

BaseResponse = _reflection.GeneratedProtocolMessageType('BaseResponse', (_message.Message,), {
  'DESCRIPTOR' : _BASERESPONSE,
  '__module__' : 'proto.clarifai.api.status.status_pb2'
  # @@protoc_insertion_point(class_scope:clarifai.api.status.BaseResponse)
  })
_sym_db.RegisterMessage(BaseResponse)

if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'\n\034com.clarifai.grpc.api.statusP\001Z>github.com/Clarifai/clarifai-go-grpc/proto/clarifai/api/status\242\002\004CAIP'
  _STATUS.fields_by_name['stack_trace']._options = None
  _STATUS.fields_by_name['stack_trace']._serialized_options = b'\200\234\'\001'
  _STATUS.fields_by_name['internal_details']._options = None
  _STATUS.fields_by_name['internal_details']._serialized_options = b'\200\234\'\001'
  _STATUS.fields_by_name['redirect_info']._options = None
  _STATUS.fields_by_name['redirect_info']._serialized_options = b'\200\234\'\001'
  _STATUS._serialized_start=151
  _STATUS._serialized_end=434
  _REDIRECTINFO._serialized_start=436
  _REDIRECTINFO._serialized_end=536
  _BASERESPONSE._serialized_start=538
  _BASERESPONSE._serialized_end=597
# @@protoc_insertion_point(module_scope)