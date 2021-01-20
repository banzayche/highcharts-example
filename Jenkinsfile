pipeline {
  agent {
    docker {
      image 'node:latest'
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
