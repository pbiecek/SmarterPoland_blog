#include "improc.h"

std::vector< Vec4i > get_h_lines(Mat& img)
{

	int h = img.rows;
	int w = img.cols;

	std::vector< Vec4i > lines;

	int length_th = 100;

	for (int x = 0; x<w; x++)
	{
		int y1 = 0;
		int in_row = 0;
		int longest = 0;
		Vec4i longest_line(0, 0, 0, 0);
		for (int y = 0; y<h; y++)
		{
			if (img.at<unsigned char>(y, x) < 140)
			{
				if (in_row == 0)
					y1 = y;
				in_row += 1;
			}

			else
			{
				if (in_row > length_th)
					lines.push_back(Vec4i(x, y1, x, y - 1));
				in_row = 0;
			}


		}
		if (in_row > length_th)
			lines.push_back(Vec4i(x, y1, x, h - 1));

	}
	return lines;
}


std::vector< Vec4i > get_v_lines(Mat& img)
{
	int h = img.rows;
	int w = img.cols;

	std::vector< Vec4i > lines;
	unsigned int length_th = 200;

	for (int y = 0; y<h; y++)
	{
		int x1 = 0;
		int x2 = 0;
		int in_row = 0;
		Vec4i longest_line(0, 0, 0, 0);

		for (int x = 0; x<w; x++)
		{
			if (img.at<unsigned char>(y, x) < 140)
			{
				if (in_row == 0)
					x1 = x;
				in_row += 1;
			}
			else
			{
				if (in_row > length_th)
					lines.push_back(Vec4i(x1, y, x, y));
				in_row = 0;
			}
		}
		if (in_row > length_th)
			lines.push_back(Vec4i(x1, y, w - 1, y));
	}
	return lines;
}


Mat strengthen_lines(Mat &img)
{
	std::vector< Vec4i > vlines = get_v_lines(img);
	std::vector< Vec4i > hlines = get_h_lines(img);


	Mat working_img = Mat(img.rows, img.cols, img.type(), Scalar(255));

	for (unsigned int l = 0; l<vlines.size(); l++)
		line(working_img, Point(vlines[l](0), vlines[l](1)), Point(vlines[l](2), vlines[l](3)), 0);
	for (unsigned int l = 0; l<hlines.size(); l++)
		line(working_img, Point(hlines[l](0), hlines[l](1)), Point(hlines[l](2), hlines[l](3)), 0);
	//for( std::vector<Vec4i>::iterator line=vlines.begin(); line!=vlines.end(); line++)
	//	line(working_img, Point((*line)(0),(*line)(1)), Point((*line)(2),(*line)(3)), 0);
	//for( std::vector<Vec4i>::iterator line=hlines.begin(); line!=vlines.end(); line++)
	//	line(working_img, Point((*line)[0],(*line)[1]), Point((*line)[2],(*line)[3]), 0);

	return working_img;
}

Mat unsubpixel(Mat& img)
{
	Mat unsubpixel_im(img.rows * 3, img.cols * 3, CV_8UC1);
	for (int y = 0; y < img.rows; y++)
	{
		for (int x = 0; x < img.cols; x++)
		{
			//cout << x << " " << y << " " << im.cols <<" " << im.rows <<"\n";
			unsigned char r = img.at<Vec3b>(y, x)[2];
			unsigned char g = img.at<Vec3b>(y, x)[1];
			unsigned char b = img.at<Vec3b>(y, x)[0];
			for (int y0 = 0; y0 < 3; y0++)
			{
				unsubpixel_im.at<unsigned char>(3 * y + y0, 3 * x) = r;
				unsubpixel_im.at<unsigned char>(3 * y + y0, 3 * x + 1) = g;
				unsubpixel_im.at<unsigned char>(3 * y + y0, 3 * x + 2) = b;
			}
		}
	}
	return unsubpixel_im;
}