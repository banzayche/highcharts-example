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
              cd hello-world-node
              ls
              npm install
            '''
          }

          stage('Lint') {
            sh label:
            'Running npm run lint',
            script: '''
              cd hello-world-node
              ls
              npm run lint
            '''
          }
        }
    }

    // stage('Get test dependency') {
    //   sh label:
    //     'Downloading chrome.json',
    //   script: '''
    //     wget https://raw.githubusercontent.com/jfrazelle/dotfiles/master/etc/docker/seccomp/chrome.json -O $WORKSPACE/chrome.json
    //   '''
    }

    docker.image('ismail0352/chrome-node').inside('--name chrome-node --security-opt seccomp=$WORKSPACE/chrome.json') {
      stage('Test') {
        sh label:
          'Running npm run test',
        script: '''
          node --version
          cd hello-world-node
          npm run test
        '''
      }

      // stage('e2e') {
      //   sh label:
      //     'Running npm run e2e',
      //   script: '''
      //     cd hello-world-node
      //     npm run e2e
      //   '''
      // }
    }
    stage ('Build') {
      docker.image('node:10').inside {
        sh label:
          'Running npm run build',
        script: '''
          node --version
          cd hello-world-node
          npm run build
        '''
      }
    }
  }

}
