import django_filters
from rest_framework import response, status


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
