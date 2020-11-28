module.exports = function( grunt ) {

  grunt.initConfig({
    /* Location of the project's package.JSON file */
    pkg: grunt.file.readJSON( 'package.json' ),

    /**
     * Sass task
     */
    sass: {
      dev: {
        options: {
          style: 'expanded',
          sourcemap: 'none', /* This file would tell where all the different components came from */
        },
        files: {
          'style.css': 'scss/style.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none',
        },
        files: {
          'style.min.css': 'scss/style.scss'
        }
      }
    },

    /**
     * Autoprefixer task
     */
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      // prefix all files
      multiple_files: {
        expand: true,
        flatten: true,
        src: '*.css',
        dest: ''
      }
    },

    /**
     * BabelJS task
     * @link https://babeljs.io/docs/usage/api/
     */
    babel: {
      dev: {
        options: {
          minified: false,
          sourceMap: false,
          presets: ['latest', 'react']
        },
        files: {
          "js/app.js": "js/react-app.js"
        }
      },
      dist: {
        options: {
          minified: true,
          sourceMap: false,
          presets: ['latest', 'react']
        },
        files: {
          "js/app.min.js": "js/react-app.js"
        }
      }
    },

    /**
     * Watch task
     */
    watch: {
      css: {
        files: '**/*.scss', /* What files are we watching? */
        tasks: [ 'sass','autoprefixer' ]     /* Run this task (above) */
      },
      js: {
        files: 'js/react-app.js',
        tasks: [ 'babel' ]
      }
    },
  });
  grunt.loadNpmTasks( 'grunt-contrib-sass' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-autoprefixer' );
  grunt.loadNpmTasks( 'grunt-babel' );
  grunt.registerTask( 'default', ['watch'] );
}
