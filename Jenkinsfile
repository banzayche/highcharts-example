node {
    agent none

    stage('Clean Workspace'){
      cleanWs()
    }

    environment {
      HOME = "${WORKSPACE}"
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

//     stage('Test') {
//       parallel {
//         stage('Static code analysis') {
//             steps { sh 'npm run-script lint' }
//         }
//
//         stage('TypeScript Linting') {
//             steps { sh 'npm run-script tslint' }
//         }
//
//         stage('Unit Tests') {
//             steps { sh 'npm run-script test:ci' }
//         }
//       }
//     }

//     stage('Build') {
//       steps { sh 'npm run-script build' }
//     }

}
