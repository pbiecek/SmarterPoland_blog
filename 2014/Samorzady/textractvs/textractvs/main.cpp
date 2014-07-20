#include "opencv2/imgproc/imgproc.hpp"
#include "opencv2/highgui/highgui.hpp"
#include "opencv2/ml/ml.hpp"

#include <tesseract/baseapi.h>

#include <iostream>
#include <fstream>
#include <ctype.h>
#include <cstdio>
#include <algorithm>
#include <ctime>
#include <stack>
#include <map>
#include <sstream>

#include "improc.h"
#include "text_area.h"
#include "contours.h"



#include <windows.h>





using namespace cv;
using namespace std;






std::vector< std::string > ocr_contours_no_files(Mat& img, std::vector<vector<Point> >& contours)
{
    std::vector< std::string > results;
	char* outText;
    tesseract::TessBaseAPI *api = new tesseract::TessBaseAPI();
	if (api->Init(NULL, "pol")) {
		fprintf(stderr, "Could not initialize tesseract.\n");
		//exit(1);
		return results;
	}

	for (unsigned int i = 0; i < contours.size(); i++)
	{
		 int minx = img.cols;
		 int maxx = 0;
		 int miny = img.rows;
		 int maxy = 0;
		for (unsigned int j = 0; j < contours[i].size(); j++)
		{
			minx = min(minx,contours[i][j].x);
			maxx = max(maxx,contours[i][j].x);

			miny = min(miny, contours[i][j].y);
			maxy = max(maxy, contours[i][j].y);

		}
		Mat subimg = img(Range(miny, maxy), Range(minx, maxx));
		api->SetImage(subimg.data, subimg.cols, subimg.rows, 1, img.cols);
		outText = api->GetUTF8Text();
		results.push_back(outText);	//memory leak?
		//cout << "OCR output:" << outText;
		//delete[] outText;

		
	}

	

	api->End();
	//delete[] outText;

	return results;
}





int main( int argc, char** argv)
{
    if(argc!=2)
    {
        std::cout<<"Wrong usage!";
        exit(-1);
    }
    Mat im = imread( argv[1] );
    std::cout<<im.rows<<" "<<im.cols<<endl;

	Mat imgray;
	bool unsub= true;
	if (unsub == true)
	{
		imgray = unsubpixel(im);
	}
	else
	{
		cvtColor(im, imgray, COLOR_BGR2GRAY);
	}
    
    

	//it would be nice to pass threshold level here!
    Mat lines_img = strengthen_lines(imgray);
	//imwrite("nolines.png", imgray - lines_img);
    //imshow("lines_img", lines_img);
   // imwrite("i1.png", lines_img);


	vector<vector<Point> > contours;
	vector<Vec4i> hierarchy;

	//strange but it seems that findContours damage image
	Mat lines_img_cpy = lines_img.clone();
	findContours(lines_img_cpy,contours, hierarchy, RETR_TREE, CHAIN_APPROX_SIMPLE);
	
    cout<<"All contours "<<contours.size()<<endl;
	vector<vector<Point> > sq;

	for( unsigned int i=0; i< hierarchy.size(); i++)
    {
        if( hierarchy[i][2]==-1 )
            sq.push_back(contours[i]);
    }
    cout<<"Contours no children "<<sq.size()<<endl;
	////////////////////////////////////////////

	//////////////////////////////////////
	sq = find_squares_approximate(sq);
	//sq = find_squares(sq);
	cout<<"Squares "<<sq.size()<<endl;
	sq = filter_small(sq,300);
	cout<<"Small "<<sq.size()<<endl;
	sq = filter_flat(sq, 10);
	cout<<"Flat "<<sq.size()<<endl;



    std::vector<std::string> contours_strings = ocr_contours_no_files(imgray, sq);

	std::vector<TextArea> text_area(contours_strings.size());
	//std::vector<TextArea> text_area_cols(contours_strings.size());


	for (unsigned int i = 0; i < sq.size(); i++)
	{
		 int minx = lines_img.cols;
		 int maxx = 0;
		 int miny = lines_img.rows;
		 int maxy = 0;
		 for (unsigned int j = 0; j < sq[i].size(); j++)
		{
			minx = min(minx, sq[i][j].x);
			maxx = max(maxx, sq[i][j].x);

			miny = min(miny, sq[i][j].y);
			maxy = max(maxy, sq[i][j].y);

		}
		text_area[i] = TextArea(Point(minx, miny), Point(maxx, maxy), contours_strings[i]);
		//text_area_cols[i] = TextArea(Point(minx, miny), Point(maxx, maxy), &contours_strings[i]);
	}
	std::sort(text_area.begin(), text_area.end(), TextArea::cmp_rows_first);
	//std::sort(text_area_cols.begin(), text_area_cols.end(), TextArea::cmp_cols_first);

	std::vector<std::string> colNames;
	process_headers(text_area, &colNames);

	ofstream out_stream;
	out_stream.open("table.txt");
	//write col names
	for (unsigned int i = 0; i < colNames.size(); i++)
	{
		if (i<colNames.size()-1)
			out_stream << "\"" << colNames[i] << "\"" << "\t";
		else
			out_stream << "\"" << colNames[colNames.size() - 1] << "\"";
	}

	int i = 0;
	while (i < text_area.size())
	{

		unsigned int j = i;
		while (j < text_area.size() && text_area[j].minimal.y == text_area[i].minimal.y)
		{
			std::string text = text_area[j].text;
			if (text.size()>1)
				text = text.substr(0, text.size() - 2);
			//if text == empty?
			if (text_area[j].isHeader==false)
				if (i == j)
					out_stream << "\"" << text << "\"";
				else
					out_stream << "\t" << "\"" << text << "\"";
			++j;
		}
		out_stream << "\n";
		i = j;
	}
	out_stream.close();


	//ofstream out_stream;
	out_stream.open("table2.txt");
	 i = 0;
	while (i < text_area.size())
	{

		unsigned int j = i;
		while (j < text_area.size() && text_area[j].minimal.y == text_area[i].minimal.y)
		{
			std::string text = text_area[j].text;
			if (text.size()>1)
				text = text.substr(0, text.size() - 2);
			//if text == empty?

			if (i==j)
				out_stream << text;	
			else
				out_stream << ", " << text;
			++j;
		}
		out_stream << "\n";
		i = j;
	}
	out_stream.close();


	 ofstream f("contours.txt");
	 for (unsigned int i = 0; i < sq.size(); i++)
	 {
		  int minx = lines_img.cols;
		  int maxx = 0;
		  int miny = lines_img.rows;
		  int maxy = 0;
		 for (unsigned int j = 0; j < sq[i].size(); j++)
		 {
			 minx = min(minx, sq[i][j].x);
			 maxx = max(maxx, sq[i][j].x);

			 miny = min(miny, sq[i][j].y);
			 maxy = max(maxy, sq[i][j].y);

		 }
		 std::string text = contours_strings[i];
		 if (contours_strings[i].size()>1)
			 text = contours_strings[i].substr(0, contours_strings[i].size() - 2);
		 f << "\"" << minx << "\"" << " " << "\"" << miny << "\"" << " " << "\"" << maxx << "\"" << " " << "\"" << maxy << "\"" << " " << "\"" << text << "\"" <<  "\n";
		 //else
		//	 std::string text = contours_strings[i];
			 
		 putText(lines_img, text, Point((maxx + minx) / 2, (miny + maxy) / 2), FONT_HERSHEY_COMPLEX, 1.0, Scalar(0), 2);

		 std::ostringstream outstream;
		 outstream << i;
		 putText(lines_img, outstream.str(), Point(minx, maxy), FONT_HERSHEY_COMPLEX, 1.0, Scalar(0), 2);

	 }
	 f.close();
	 imwrite("i2.png", lines_img);
	 imwrite("i3.png", im);
	 

	return 0;
}


