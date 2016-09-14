require "yaml"
require "json"
if(ARGV.size == 0)
  puts "\tyamlToJSON.cr INPUT_DIR [OUTPUT_DIR]"
  puts "\t- if OUTPUT_DIR is omitted then STDOUT will be used"
  exit(0)
end
files = Dir.glob(File.join(File.expand_path(ARGV[0]),"*.page"))
puts files
pages = files.map do |f|
  begin
    YAML.parse(File.read(f)).as_h
  rescue
    puts "ERROR at #{f}"
  end
end
if(ARGV.size == 1)
  puts pages.to_json
else
  File.write(File.join(File.expand_path(ARGV[1]),"pages.js"), pages.to_json)
end
