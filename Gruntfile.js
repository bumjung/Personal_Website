module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            build: {
                files: {
                    'css/style.css': 'less/style.less'
                }
            }
        },
        watch: {
            files: 'less/*.less',
            tasks: 'less'
        }
    });


    grunt.registerTask('default', 'watch');

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
