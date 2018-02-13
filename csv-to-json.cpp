#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <unordered_map>

using namespace std;

typedef unordered_map<string, vector<string> > stringToVector;

string parseID(string id) {
  int dashPos = id.find("-");
  return id.substr(dashPos+1); // "123-45" -> "45"
}

string parseCategory(string category) {
  int slashPos = category.find("/");
  if(slashPos != string::npos)
		category = category.erase(slashPos,1);
  category = category.substr(1,category.length()-2);
  return category;
}

string parseImage(string image) {
  return "\"https:" + image.substr(1);
}

/*
  - Params: vector of property values (no keys), id of current season
  - Return: concatenated object string
*/
string parseDesiredProperties(vector<string> propValues, string seasonID, stringToVector & categories) {
  string id = parseID(propValues[0]);
  string cat = parseCategory(propValues[2]);
  cat[0] = toupper(cat[0]);
  string itemID = "\"" + seasonID + "_" + cat + "_" + id; // id has closing "

  string object = itemID + ": {\n";
  object += "  \"description\": " + propValues[8] + ",\n";
  object += "  \"image\": " + parseImage(propValues[6]) + ",\n";
  object += "  \"link\": " + propValues[5] + ",\n";
  object += "  \"name\": " + propValues[7] + ",\n";
  
  object += "},\n";

  categories["\"" + cat + "\""].push_back(itemID);

  return object;
}

/*
  - Params: name of file to read in
  - Outputs parsed JSON into new file
  - Return: void
*/
vector<string> parseCsvToJson(string filename, stringToVector& categories) {
  vector<string> itemObjects;
  ifstream infile(filename);

  // Iterate through each line
  while(infile) {
    string s;
    if(!getline(infile, s)) break;

    istringstream ss(s);
    vector<string> propValues;

    string prefix = "";

    // Iterate through properties in line
    while(ss) {
      string s;
      // parse by commas
      if(!getline(ss,s,',')) break;
      s = prefix + s;
      if(s[s.length()-1] != '\"') { // If string doesn't end in double quotes
      	prefix = s;
      } else {
				propValues.push_back(s);
        prefix = "";
      }
    }
    
    if(propValues.empty()) break;

    string object = parseDesiredProperties(propValues, "SS18", categories);
    itemObjects.push_back(object);
  }

  return itemObjects;
}

int main() {
  stringToVector categories;
	vector<string> objects = parseCsvToJson("supreme-preview-springsummer2018.csv", categories);
  
  // Write to file
  ofstream outputFile;
  outputFile.open("output.json");
  outputFile << "{"; // root opening brace

  outputFile << "\"_metadata\": {" << endl;
    outputFile << "\"contactEmail\": \"kevinlargoapps@gmail.com\"," << endl;
    outputFile << "\"currentSeasonID\": \"2018_1\"," << endl;
  outputFile << "}," << endl;

  outputFile << "\"items\": {" << endl;
  for(int i = 0; i < objects.size(); i++)
    outputFile << objects[i];
  outputFile << "}," << endl;

  outputFile << "\"seasons\": {" << endl;
    outputFile << "\"2018_1\": {" << endl;
      outputFile << "\"name\": \"SS18\"," << endl;
      outputFile << "\"categoryIDs\": {" << endl;
        outputFile << "\"SS18_Jackets\": true," << endl;
        outputFile << "\"SS18_Shirts\": true," << endl;
        outputFile << "\"SS18_Topssweaters\": true," << endl;
        outputFile << "\"SS18_Sweatshirts\": true," << endl;
        outputFile << "\"SS18_Pants\": true," << endl;
        outputFile << "\"SS18_Shorts\": true," << endl;
        outputFile << "\"SS18_T-shirts\": true," << endl;
        outputFile << "\"SS18_Hats\": true," << endl;
        outputFile << "\"SS18_Bags\": true," << endl;
        outputFile << "\"SS18_Accessories\": true," << endl;
        outputFile << "\"SS18_Skate\": true," << endl;
      outputFile << "}," << endl;
    outputFile << "}," << endl;
  outputFile << "}," << endl;

  outputFile << "\"categories\": {" << endl;
  for(stringToVector::iterator i = categories.begin(); i != categories.end(); i++) {
    string categoryName = i->first;
    vector<string> category = i->second;
    outputFile << "\"SS18_" << categoryName.substr(1,categoryName.length()-2) << "\": {" << endl;
      outputFile << "\"name\": " << (categoryName == "\"Topssweaters\"" ? "\"Tops/Sweaters\"" : categoryName) << "," << endl;
      outputFile << "\"itemIDs\": {" << endl;

      for(int j = 0; j < category.size(); j++)
        outputFile << category[j] << ": true," << endl;

      outputFile << "}," << endl; // close itemIDs
    outputFile << "}," << endl; // close category
  }
  outputFile << "}," << endl;

  outputFile << "}"; // root closing brace
  outputFile.close();
}
