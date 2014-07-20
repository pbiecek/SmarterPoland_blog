#ifndef __TEXT_AREA_H_
#define __TEXT_AREA_H_
#include "opencv2/imgproc/imgproc.hpp"
#include "opencv2/highgui/highgui.hpp"
#include <stack>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;
using namespace cv;

class TextArea;
void process_headers(std::vector<TextArea>& text_area, std::vector<std::string>* columnNames);


class TextArea
{
public:
	bool isHeader;
	Point minimal;
	Point maximal;
	std::string text;
	std::string withHeaderText;
	TextArea() :minimal(0), maximal(0), isHeader(false){}
	TextArea(Point& pminimal, Point& pmaximal, std::string area_text) :minimal(pminimal), maximal(pmaximal), text(area_text), isHeader(false){}
	bool operator<(TextArea& o)
	{
		if (minimal.y == o.minimal.y)
			return minimal.x < o.minimal.x;

		return minimal.y < o.minimal.y;
	}

	static bool cmp_cols_first(TextArea& t1, TextArea& t2)
	{
		if (t1.minimal.x == t2.minimal.x)
			return t1.minimal.y < t2.minimal.y;

		return t1.minimal.x < t2.minimal.x;
	}

	static bool cmp_rows_first(TextArea& t1, TextArea& t2)
	{
		if (t1.minimal.y == t2.minimal.y)
			return t1.minimal.x < t2.minimal.x;

		return t1.minimal.y < t2.minimal.y;
	}


};

#endif
