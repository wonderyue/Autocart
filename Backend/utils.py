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


class ListFilterMixin(object):
    """
    List a queryset filter by request.user. 
    For permissions.IsAuthenticated 
    """

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(
            self.custemFilter(self.get_queryset(), request))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return response.Response(serializer.data)


class ListFilterByUserMixin(ListFilterMixin):
    """
    List a queryset filter by request.user. 
    For permissions.IsAuthenticated 
    """

    def custemFilter(self, queryset, request):
        return queryset.filter(user=self.request.user)


class CreateByUserMixin:
    """
    Auto fill user field with request.user.id
    For permissions.IsAuthenticated 
    """

    def create(self, request, *args, **kwargs):
        request.data["user"] = request.user.id
        return super().create(request, *args, **kwargs)
