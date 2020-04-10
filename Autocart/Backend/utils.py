import django_filters
from rest_framework import response, status, serializers


class CommaSeparatedValueFilter(django_filters.CharFilter):
    """Accept comma separated string as value and convert it to list.
    It's useful for __in lookups.
    """

    def filter(self, qs, value):
        if value:
            value = value.split(',')

        return super(CommaSeparatedValueFilter, self).filter(qs, value)


class DestroyWithPayloadMixin(object):
    def destroy(self, *args, **kwargs):
        serializer = self.get_serializer(self.get_object())
        super().destroy(*args, **kwargs)
        return response.Response(serializer.data, status=status.HTTP_200_OK)


class ExtraFieldMixin(object):

    def get_field_names(self, declared_fields, info):
        expanded_fields = super(ExtraFieldMixin, self).get_field_names(
            declared_fields, info)

        if getattr(self.Meta, 'extra_fields', None):
            return expanded_fields + self.Meta.extra_fields
        else:
            return expanded_fields
