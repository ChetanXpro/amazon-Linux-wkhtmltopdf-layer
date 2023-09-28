FROM chetanbaliyan/amazon-linux-wkhtmltopdf-layer AS wkhtmltopdf-layer
FROM public.ecr.aws/lambda/nodejs:16

RUN yum -y install unzip
COPY --from=wkhtmltopdf-layer . /tmp
RUN unzip /tmp/layer.zip -d /opt
RUN rm /tmp/layer.zip




# Copy function code

COPY index.js style.css package*.json ./
COPY fonts ./fonts
RUN npm install
  

CMD [ "index.handler" ]
