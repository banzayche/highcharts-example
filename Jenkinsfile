pipeline {
  agent {
    docker {
      image 'node:latest'
      'docker run -d -p 9222:9222 justinribeiro/chrome-headless'
    }
  }

  stages {
    stage('Install') {
      steps { sh 'npm install' }
    }

    stage('Install Headless Chrome') {
      steps {sh 'npm install --global chrome-headless-launcher'}
    }

    stage('Test') {
      parallel {
        stage('Unit Tests') {
            steps { sh 'npm run-script test' }
        }
      }
    }

    // stage('Build') {
    //   steps { sh 'npm run-script build' }
    // }
  }
}
