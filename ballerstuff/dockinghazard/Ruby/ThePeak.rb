nameInput = gets.chomp
ageInput = gets.chomp

name = nameInput
age = Integer(ageInput, exception: false) # Did'nt work yet. Edit: It does now.

complimentary = [ "You are old as time", "You are as young as a bean sprout", "You are great", "You are the fine wine them people yap about", "No Idea What to Say"]

judgement = if age.nil? # If it's weird.
				complimentary[4] #E
            elsif age >= 50 # 50+
				complimentary[0] #A
			elsif age < 25 # Smoler than 25.
				complimentary[1] #B
			elsif age >= 25 && age <= 30 # 25-30
				complimentary[2] #C
			elsif age > 30 && age <= 45 # 31-45
				complimentary[3] #D
			end

puts "Suppa, #{name}! You are #{age} years old. #{judgement}."
