// Project Name: DLAB01SP2024_LogicGate									
// File name:DLAB01SP2024_LogicGate.CPP									
// Programmer: hpham   // Change to your name									
// VERSION DATE: February 26, 2024									
#include"C:\Users\Kishore PreMed\Downloads\IO.h" //Use as you run program in the class									
// #include"C:\ETT\IO.h"  // Use as you run at home in your computer									
using namespace std;									
// Function definition or prototype area									
//void DTestValidation();									
									
void main()									
{									
	// The following code must be in any test program								
	Setup(0);	     // this function must be here							
	system("cls");	// clear the screen							
	system("COLOR 0F");		// LIGHT AQUA						
	char *VersionDate = "        February 26, 2024";  // change the date								
	Semester = "2024Spring";								
	Section = "TechII";								
	LastName = "Pham";			// change name					
	FirstName = "Hoai";			// change name					
	TestProgram ="DLAB01SP2024_LogicGate";// change each DLAB								
	if (!CheckNames())								
		return;							
	// The test program starting here								
	cout << TestProgram << " Test in progress..." << endl;								
	system("cls");	// clear the screen							
	system("COLOR 0D");		// LIGHT GREEN						
	cout << "\n>>>> D L A B 0 1 SP 2024_LogicGate  <<<<" << endl;								
	cout << "        Version Date: " << VersionDate << endl << endl;								
	testno = 1;								
	testtitle = "Test01";								
	expected_data = 0X06;   // from PORT C								
	maskdata = 0X07;        // from PORT C								
	pcof = "U1,U2,U3";      // from PORT C								
	WriteToPortA(0X00, 0);	// from PortA							
	// the following codes can not be changed								
	measured_data = ReadPortC(0);								
	TestEvaluation(expected_data, measured_data);								
	if (NOGO)								
		TestFailed();							
	else								
		TestPass();							
	testno = 2;								
	testtitle = "Test02";								
	expected_data = 0X07;             // from PORT C								
	WriteToPortA(0X01, 0);	// from portA							
	// the following codes can not be changed						 		
	measured_data = ReadPortC(0);								
	TestEvaluation(expected_data, measured_data);								
	if (NOGO)								
		TestFailed();							
	else								
		TestPass();							
	 								
	testno = 3;								
	 								
	testno = 4;								
	 								
	testno = 5;								
	 								
	testno = 6;								
	 								
	testno = 7;								
	 								
	testno = 8;								
	 								
	///////// YOUR CODE MUST BE ABOVE THIS LINE //////////////								
	EndTestProgram();		// function call to display PASS/FAIL						
	Delay(10000);								
} ///////////////////////////// end main() //////////////////////////////////////////////									
