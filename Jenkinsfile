pipeline {
  agent {
    docker {
      image 'node:latest'
      image 'chromedp/headless-shell'
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
