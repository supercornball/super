nameInput = gets.chomp
ageInput = gets.to_i

name = nameInput
age = Integer(ageInput, exception: false) # Did'nt work yet.

complimentary = [ "You are old as time", "You are as small as bottlecap", "You are great", "You are the fine wine them people yap about", "No Idea What to Say"]

judgement = if age >= 50 # 50+
				complimentary[0] #A
			elsif age < 25 # Smoler than 25.
				complimentary[1] #B
			elsif age >= 25 && age <= 30 # 25-30
				complimentary[2] #C
			elsif age > 30 && age <= 45 # 31-45
				complimentary[3] #D
			elsif age.nil? # If it's weird.
				complimentary[4] #E
			end

puts "Suppa, #{name}! You are #{age} years old. #{judgement}."
