# VERSION 0.1
# AUTHOR:         Antonio Lain <antlai@cafjs.com>
# DESCRIPTION:    Image containing data for app templates
# TO_BUILD:       docker build --rm -t gcr.io/cafjs-k8/root-template .
# TO_RUN:         docker run -u $(id -u):$(id -g) -v ${OUT_DIR}:/out ${SRC_IMAGE} ${TEMPLATE_DIR} /out
#

FROM busybox

COPY ./copyAll.sh /bin

COPY ./templates /templates

ENTRYPOINT ["/bin/copyAll.sh"]