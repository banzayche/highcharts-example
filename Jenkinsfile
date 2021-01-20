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

    stage('BuildInside') {
         docker.image('justinribeiro/chrome-headless').withRun('-d -p 9222:9222') {c ->
            // docker.image('ubuntu1804').inside{
            //    /*  Do something here inside container  */
            //    sh "ls"
            // }
        }
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
