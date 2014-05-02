#include <cstdlib>
#include <iostream>
#include <unistd.h> 

using namespace std;

int main(int argc, char *argv[])
{
//    system("PAUSE");
    execl("..\\..\\xulrunner\\xulrunner.exe", "xulrunner.exe -app application.ini","1","",NULL); 
    return EXIT_SUCCESS;
}
