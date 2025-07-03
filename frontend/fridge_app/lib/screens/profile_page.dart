import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Profile Page',
      theme: ThemeData(
        fontFamily: 'Inter', // Apply custom font
        scaffoldBackgroundColor: const Color.fromARGB(255, 255, 255, 255), // Set background colour
        textTheme: TextTheme(
          bodyMedium: TextStyle(fontSize: 14),
          titleLarge: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
        ),
      ),
      home: ProfilePage(), // this is the first screen that opens when the app launches 
      debugShowCheckedModeBanner: false,
    );
  }
}

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  bool _isPressed = false;
  
  @override
  Widget build(BuildContext context) {
    return Scaffold( // scaffold is a layout structure that provides a basic material design visual layout structure
      appBar: AppBar( // adds an appbar to top of screen
        title: const Text('Profile',
        style: TextStyle(color: Colors.black),),
        centerTitle: true,
        backgroundColor: Colors.transparent,
        elevation: 0,
        surfaceTintColor: Colors.transparent,
        actions: [
          GestureDetector(
            onTapDown: (_) => setState(() => _isPressed = true),
            onTapUp: (_) => setState(() => _isPressed = false),
            onTapCancel: () => setState(() => _isPressed = false),
            onTap: () {
              // Action for settings button
              print('Settings tapped');
            },
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Icon(
                Icons.settings,
                color: _isPressed ? Colors.grey[400] : Colors.black,
              ),
            ),
          ),
        ],
      ),

      body: Column(
        children: [
          SizedBox(height: 20), // 20px space at the top

          // Profile Picture
          CircleAvatar(
            radius: 50,
            backgroundImage: AssetImage('assets/images/nyree_pfp.jpg'),
          ),

          SizedBox(height: 10),

          // Name
          Text(
            '@bibiniree',
            style: Theme.of(context).textTheme.titleLarge,
          ),

          // Bio
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 40.0, vertical: 10),
            child: Text(
              'epic foodie🍧🧁🍇🍎',
              style: TextStyle(fontSize: 14, color: Colors.grey[600]),
              textAlign: TextAlign.center,
            ),
          ),

          SizedBox(height: 20),

          // Stats Row
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _buildStatColumn('Meals', '24'),
              _buildStatColumn('Food Buddies', '27'),
            ],
          ),

          SizedBox(height: 30),

          // Buttons
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  elevation: 0, // removes shadow
                  backgroundColor: const Color.fromARGB(255, 168, 209, 243), // optional: customize color
                  shadowColor: Colors.transparent, // extra assurance
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10), // iOS-like curve
                  ),
                ),
                child: Text(
                  'Edit profile',
                  style: TextStyle(fontWeight: FontWeight.w800)),
              ),
              SizedBox(width: 10),
              ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  elevation: 0, // removes shadow
                  backgroundColor: const Color.fromARGB(255, 168, 209, 243), // optional: customize color
                  shadowColor: Colors.transparent, // extra assurance
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10), // iOS-like curve
                  ),
                ),
                child: Text(
                  'Message',
                  style: TextStyle(fontWeight: FontWeight.w800)),
              ),
            ],
          ),

          SizedBox(height: 30),

          // Placeholder for posts
          Expanded(
            child: GridView.count(
              crossAxisCount: 3,
              children: List.generate(9, (index) {
                return Container(
                  margin: EdgeInsets.all(4),
                  color: Colors.blueGrey[200],
                  child: Center(
                    child: Icon(Icons.image, color: Colors.white),
                  ),
                );
              }),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatColumn(String label, String count) {
    return Column(
      children: [
        Text(
          count,
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
        ),
        SizedBox(height: 4),
        Text(label, style: TextStyle(color: Colors.grey[600])),
      ],
    );
  }
}