node ('My Node') {
  environment {
    HOME = "${WORKSPACE}"
  }

    stage('Clean Workspace'){
      cleanWs()
    }

    stage("Main build") {
        docker.image('node:14.15.1').pull()
        docker.image('ismail0352/chrome-node').pull()

        // Permorming Install and Lint
        docker.image('node:14.15.1').inside {
          stage('Install') {
            sh label:
            'Running npm install',
            script: '''
              node --version
              npm install
            '''
          }

          stage('Lint') {
            sh label:
            'Running npm run lint',
            script: '''
              npm run lint
            '''
          }
        }
    }

}
