pipeline {
 agent { docker { image "registry.docker.internal/pierre42100/docker-comunicwebappscratch" } }
 stages {
  stage("build") {
   steps {
    sh 'php --version'
	sh './builder build offline'
   }
  }
 }
}
