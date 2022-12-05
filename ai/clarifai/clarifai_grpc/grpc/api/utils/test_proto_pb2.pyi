"""
@generated by mypy-protobuf.  Do not edit manually!
isort:skip_file
"""
import builtins
import google.protobuf.descriptor
import google.protobuf.message
import typing
import typing_extensions

DESCRIPTOR: google.protobuf.descriptor.FileDescriptor

class TestProto(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor
    ID_FIELD_NUMBER: builtins.int
    MESSAGE_FIELD_NUMBER: builtins.int
    VALUE_FIELD_NUMBER: builtins.int
    IMAGE_BYTES_FIELD_NUMBER: builtins.int
    STRING_ONEOF_FIELD_NUMBER: builtins.int
    BOOL_ONEOF_FIELD_NUMBER: builtins.int
    MESSAGE_ONEOF_FIELD_NUMBER: builtins.int
    id: typing.Text
    message: typing.Text
    value: builtins.float
    image_bytes: builtins.bytes
    string_oneof: typing.Text
    bool_oneof: builtins.bool
    @property
    def message_oneof(self) -> global___TestProto2: ...
    def __init__(self,
        *,
        id: typing.Text = ...,
        message: typing.Text = ...,
        value: builtins.float = ...,
        image_bytes: builtins.bytes = ...,
        string_oneof: typing.Text = ...,
        bool_oneof: builtins.bool = ...,
        message_oneof: typing.Optional[global___TestProto2] = ...,
        ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["bool_oneof",b"bool_oneof","message_oneof",b"message_oneof","one_of_field",b"one_of_field","string_oneof",b"string_oneof"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["bool_oneof",b"bool_oneof","id",b"id","image_bytes",b"image_bytes","message",b"message","message_oneof",b"message_oneof","one_of_field",b"one_of_field","string_oneof",b"string_oneof","value",b"value"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["one_of_field",b"one_of_field"]) -> typing.Optional[typing_extensions.Literal["string_oneof","bool_oneof","message_oneof"]]: ...
global___TestProto = TestProto

class TestProto2(google.protobuf.message.Message):
    DESCRIPTOR: google.protobuf.descriptor.Descriptor
    ID_FIELD_NUMBER: builtins.int
    FLIP_FIELD_NUMBER: builtins.int
    id: typing.Text
    flip: builtins.bool
    def __init__(self,
        *,
        id: typing.Text = ...,
        flip: builtins.bool = ...,
        ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["flip",b"flip","id",b"id"]) -> None: ...
global___TestProto2 = TestProto2