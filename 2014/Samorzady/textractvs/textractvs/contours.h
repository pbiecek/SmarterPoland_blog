#ifndef __CONTOURS_H_
#define __CONTOURS_H_
#include <vector>
#include <cmath>
#include <stack>
#include <map>
#include <iostream>
#include "opencv2/imgproc/imgproc.hpp"
#include "opencv2/highgui/highgui.hpp"

using namespace std;
using namespace cv;

float angle(Point p1, Point p2, Point p0);
std::vector<vector<Point> > find_squares(std::vector<vector<Point> >&  contours);

std::vector<vector<Point> > find_squares_approximate(std::vector<vector<Point> >&  contours);
std::vector<vector<Point> > filter_small(std::vector<vector<Point> >& contours, float min_size);
std::vector<vector<Point> > filter_size(std::vector<vector<Point> >& contours, int threshold_low, int threshold_high);
std::vector<vector<Point> > filter_flat(std::vector<vector<Point> >& contours, float  ratio_value);
#endif
