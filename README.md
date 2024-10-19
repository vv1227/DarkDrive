# DarkDrive
Project Title:
Smart Parking System with Integrated Ride-Sharing Application ,urban mobility unified eco system ( app name: darkdrive)  

Project Description:
This project consists of three key components:

Smart Parking System (Hardware): A smart parking solution designed using Arduino, IR sensors, an MG90S servo motor, and an LCD display to manage and monitor parking slot availability. The system controls the entry and exit of vehicles, displaying the number of available slots in real-time and automatically opening/closing the gate based on slot availability.

Ride-Sharing Application (Software): A mobile app designed similar to BlaBlaCar that facilitates carpooling and ride-sharing. The app provides alternate route suggestions using map services similar to Ola and Uber, allowing users to carpool, display vehicle information, and view the most efficient routes to reach their destinations.
The app is designed to integrate with the smart parking system, making parking and ride-sharing more convenient.

Alternate route suggestions: In your ride-sharing application, you can use the Google Maps Directions API to calculate different routes between the user's origin and destination. The API provides multiple route options based on various factors such as distance, time, and traffic.

Key Features:
Smart Parking System:

Detects vehicle entry/exit using 2 IR sensors.
Controls gate operation using the MG90S servo motor.
Displays the number of available parking slots on an LCD screen.
Limits vehicle entry based on available parking slots.
Real-time slot availability display.
Ride-Sharing Application:

User registration and login (built with Flutter).
Displays car number, owner name, and car details.
Provides map suggestions for alternate routes (like Ola/Uber).
Carpooling feature to share rides with other users.
Shows minimum distance and faster route options.
Designed with a user-friendly interface using Figma.
Technologies Used:
Hardware:

Arduino Uno
MG90S Servo Motor
IR Sensors
LCD Display (I2C)
Breadboard and Jumper Wires
Software:

Mobile Application: Flutter (for UI and functionality)
Backend: Firebase (for user authentication and data storage)
Mapping: Google Maps API for route suggestions
Design: Figma for the UI/UX design

Steps to Implement Alternate Route Suggestions
Obtain Google Maps API Key:

First, you need to sign up for the Google Maps Platform and enable the Directions API.
Get the API key from your Google Cloud account.
Flutter Integration:

Add the necessary dependencies in your pubspec.yaml file for integrating Google Maps.

Here is the aurdino code:
#include <Servo.h>
#include <LiquidCrystal_I2C.h>

Servo servoMotor;
LiquidCrystal_I2C lcd(0x27, 16, 2); // Initialize LCD with I2C address 0x27

const int entrySensor = 2; // IR sensor for vehicle entry
const int exitSensor = 3;  // IR sensor for vehicle exit
const int servoPin = 9;    // Servo motor pin

int totalSlots = 4;
int availableSlots = totalSlots;

void setup() {
  servoMotor.attach(servoPin); // Attach servo motor to pin 9
  lcd.begin(16, 2);            // Initialize LCD
  lcd.backlight();
  
  pinMode(entrySensor, INPUT);
  pinMode(exitSensor, INPUT);
  
  lcd.setCursor(0, 0);
  lcd.print("Parking System");
  lcd.setCursor(0, 1);
  lcd.print("Slots: ");
  lcd.print(availableSlots);
  
  servoMotor.write(90); // Close the gate at start
}

void loop() {
  int entryState = digitalRead(entrySensor);
  int exitState = digitalRead(exitSensor);

  // Vehicle entering
  if (entryState == HIGH && availableSlots > 0) {
    delay(500); // Debounce delay
    if (digitalRead(entrySensor) == HIGH) {
      availableSlots--;
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Vehicle Entering");
      lcd.setCursor(0, 1);
      lcd.print("Slots: ");
      lcd.print(availableSlots);
      
      servoMotor.write(0); // Open the gate
      delay(2000); // Wait for vehicle to pass
      servoMotor.write(90); // Close the gate
    }
  }

  // Vehicle exiting
  if (exitState == HIGH && availableSlots < totalSlots) {
    delay(500); // Debounce delay
    if (digitalRead(exitSensor) == HIGH) {
      availableSlots++;
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Vehicle Exiting");
      lcd.setCursor(0, 1);
      lcd.print("Slots: ");
      lcd.print(availableSlots);

      servoMotor.write(0); // Open the gate
      delay(2000); // Wait for vehicle to pass
      servoMotor.write(90); // Close the gate
    }
  }

  // Update available slots on LCD
  lcd.setCursor(0, 1);
  lcd.print("Slots: ");
  lcd.print(availableSlots);
}

figma link :
https://www.figma.com/proto/PjYUkpSQkhjwVvCL7CnkFl/Dark-Drive?node-id=0-1&t=BZQ0FCEZXyh4S8M3-1
