pipeline {
  agent {
    docker { image 'node:latest' }
  }

  stages {
    stage('Install chrome') {
      steps {
        echo '"deb http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee -a /etc/apt/sources.list'
        wget '-q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -'
        sudo 'apt-get update'
        sudo 'apt-get install libxpm4 libxrender1 libgtk2.0-0 libnss3 libgconf-2-4'
        sudo 'apt-get install google-chrome-stable'
        sudo 'apt-get install xvfb gtk2-engines-pixbuf'
        sudo 'apt-get install xfonts-cyrillic xfonts-100dpi xfonts-75dpi xfonts-base xfonts-scalable'
        sudo 'apt-get install imagemagick x11-apps '
      }
    }
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
