node {
    stage('Clean Workspace'){
      cleanWs()
    }

    environment {
      HOME = "${WORKSPACE}"
    }

    stage("Main build") {
        docker.image('node:10').pull()
        docker.image('ismail0352/chrome-node').pull()

        stage('Checkout SCM') {
          checkout([$class: 'GitSCM', branches: [[name: 'master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/ismail0352/Packer-Terraform-Jenkins.git']]])
        }

        // Permorming Install and Lint
        docker.image('node:14.15.1').inside {
          stage('Install') {
            sh label:
            'Running npm install',
            script: '''
              node --version
              ls
              npm install
            '''
          }

          // stage('Lint') {
          //   sh label:
          //   'Running npm run lint',
          //   script: '''
          //     cd test2_master
          //     npm run lint
          //   '''
          // }
        }
    }

}
