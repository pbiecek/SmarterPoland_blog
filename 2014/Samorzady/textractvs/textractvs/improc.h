#ifndef __IMPROC_H_
#define __IMPROC_H_

#include "opencv2/imgproc/imgproc.hpp"
#include "opencv2/highgui/highgui.hpp"
#include "opencv2/ml/ml.hpp"
#include <vector>

using namespace std;
using namespace cv;


std::vector< Vec4i > get_h_lines(Mat& img);
std::vector< Vec4i > get_v_lines(Mat& img);
Mat strengthen_lines(Mat &img);
Mat unsubpixel(Mat& img);



#endif
