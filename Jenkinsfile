pipeline {
  agent {
    docker {
      image 'node:latest'
    }
  }

  agent {
      docker {
        image 'justinribeiro/chrome-headless'
        args '-d -p 9222:9222 --security-opt seccomp=$HOME/chrome.json'
      }
    }

  stages {
    stage('Install') {
      steps { sh 'npm install' }
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
