[![Build Status](https://qa.nuxeo.org/jenkins/buildStatus/icon?job=master/plugins_nuxeo-web-ui-master-master)](https://qa.nuxeo.org/jenkins/job/master/job/plugins_nuxeo-web-ui-master-master/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5d8cd2a3c56745ecaae7e7f92a683ea7)](https://www.codacy.com/app/Nuxeo/nuxeo-web-ui)

## Nuxeo Web UI

### Install dependencies

```sh
npm install
```

### Development workflow

#### Serve / watch

```sh
npm run start
```

This makes the Web UI available on http://0.0.0.0:5000/ to locally test. A nuxeo platform is expected to run on http://0.0.0.0:8080/ with the following `cors-config.xml`:

```xml
<component name="org.nuxeo.corsi.demo">
  <extension target="org.nuxeo.ecm.platform.web.common.requestcontroller.service.RequestControllerService" point="corsConfig">
    <corsConfig name="foobar" supportedMethods="GET,POST,HEAD,OPTIONS,DELETE,PUT"
exposedHeaders="Accept-Ranges,Content-Range,Content-Encoding,Content-Length,Content-Disposition">
      <pattern>/nuxeo/.*</pattern>
    </corsConfig>
  </extension>
</component>
```

To test other addons locally, you can use the `NUXEO_PACKAGES` environment variable. To load Nuxeo CSV and DAM addons, for example:

```sh
NUXEO_PACKAGES="nuxeo-csv nuxeo-dam" npm run start
```

| INFO: Local dev Web UI available on **http://0.0.0.0:5000/** but http://0.0.0.0:5000/nuxeo will lead to the Nuxeo-hosted Web UI (same as http://0.0.0.0:8080/)|
| --- |

#### Run tests

```sh
cd ftest
npm run test:dev
```

This runs the functionnal tests.

#### Build & Vulcanize

```sh
npm run build
```

Build and optimize the current project, ready for deployment. This includes linting as well as vulcanization, image, script, stylesheet and HTML optimization and minification.

### Production workflow

#### Marketplace package

```sh
mvn clean install
```

This will build the  `plugin/web-ui/marketplace/target/nuxeo-web-ui-marketplace-${project.version}.zip` Web UI marketplace to be deployed in a nuxeo server.

```sh
mvn clean install -Pftest
```

This also builds the marketplace running the functional tests.

## License

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

(C) Copyright Nuxeo Corp. (http://nuxeo.com/)

All images, icons, fonts, and videos contained in this folder are copyrighted by Nuxeo, all rights reserved.

## About Nuxeo

Nuxeo dramatically improves how content-based applications are built, managed and deployed, making customers more agile, innovative and successful. Nuxeo provides a next generation, enterprise ready platform for building traditional and cutting-edge content oriented applications. Combining a powerful application development environment with SaaS-based tools and a modular architecture, the Nuxeo Platform and Products provide clear business value to some of the most recognizable brands including Verizon, Electronic Arts, Sharp, FICO, the U.S. Navy, and Boeing. Nuxeo is headquartered in New York and Paris. More information is available at www.nuxeo.com.
