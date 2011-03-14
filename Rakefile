file 'index.html' => 'index.haml' do
  sh 'haml index.haml index.html'
end

file 'nwalking.js' => 'nwalking.coffee' do
  sh 'coffee -c nwalking.coffee'
end

desc 'build index.html and nwalking.js'
task default: ['index.html', 'nwalking.js']
