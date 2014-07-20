#include "contours.h"


float angle(Point p1, Point p2, Point p0)
{
	int dx1 = p1.x - p0.x;
	int dy1 = p1.y - p0.y;

	int dx2 = p2.x - p0.x;
	int dy2 = p2.y - p0.y;

	int l1 = sqrt(dx1*dx1 + dy1*dy1);
	int l2 = sqrt(dx2*dx2 + dy2*dy2);
	if (l1 == 0 || l2 == 0)
		return 0;


	return (dx2*dx1 + dy1*dy2) / (l1*l2);
}

//rectangles in fact...
std::vector<vector<Point> > find_squares(std::vector<vector<Point> >&  contours)
{
	std::vector<vector<Point> >  squares;
	for (unsigned int c = 0; c<contours.size(); c++)
	{
		unsigned int length = contours[c].size();
		if (length == 4)
		{
			//printf("good length");
			float maxcosine = 0;
			//printf("%d\n", (-1)%4);
			for (unsigned int i = 1; i < length + 1; i++)
				maxcosine = max(maxcosine, fabs(angle(contours[c][(i - 1) % length], contours[c][(i + 1) % length], contours[c][i%length])));


			if (maxcosine < 0.3)
			{
				//printf("ooo!");
				squares.push_back(contours[c]);
			}
			//else
			//	cout << "maxcosine: " << maxcosine;

		}
		//else
		//	cout << "Squares. Bad Length" << length << endl;
	}


	return squares;
}

std::vector<vector<Point> > find_squares_approximate(std::vector<vector<Point> >&  contours)
{
	std::vector<vector<Point> >  squares;
	std::vector<Point> approx;
	for (unsigned int c = 0; c<contours.size(); c++)
	{
		approxPolyDP(contours[c], approx, arcLength(Mat(contours[c]), true)*0.05, true);

		if (approx.size() < 4)
			approx = contours[c];

		unsigned int length = approx.size();

		if (length == 4)
		{
			//printf("good length");
			float maxcosine = 0;
			//printf("%d\n", (-1)%4);
			for (unsigned int i = 1; i < length + 1; i++)
				maxcosine = max(maxcosine, fabs(angle(approx[(i - 1) % length], approx[(i + 1) % length], approx[i%length])));


			if (maxcosine < 0.3)
			{
				//printf("ooo!");
				squares.push_back(approx);

			}
			//else
			//	cout << "maxcosine: " << maxcosine << endl;

		}
		//else
		//	cout << "Bad length " << length << endl;
	}


	return squares;
}


std::vector<vector<Point> > filter_small(std::vector<vector<Point> >& contours, float min_size)
{
	std::vector<vector<Point> > big;
	for (std::vector<vector<Point> >::iterator c = contours.begin(); c != contours.end(); c++)
	{
		if (fabs(contourArea(*c)) >= min_size)
			big.push_back(*c);

	}
	return big;
}

std::vector<vector<Point> > filter_size(std::vector<vector<Point> >& contours, int threshold_low, int threshold_high)
{
	std::vector<vector<Point> > filtered;
	for (std::vector<vector<Point> >::iterator c = contours.begin(); c != contours.end(); c++)
	{
		float area = fabs(contourArea(*c));
		if (area >= threshold_low && area <= threshold_high)
			filtered.push_back(*c);
	}
	return filtered;
}


std::vector<vector<Point> > filter_flat(std::vector<vector<Point> >& contours, float  ratio_value)
{
	std::vector<vector<Point> > filtered;
	std::vector<Point> line1(2);
	std::vector<Point> line2(2);
	float r = 0;
	for (std::vector<vector<Point> >::iterator c = contours.begin(); c != contours.end(); c++)
	{
		//perhaps there is one-line method
		//line1 =  (c[0],c[1]) )
		//line2 =  (c[1],c[2]) )

		line1[0] = (*c)[0];
		line1[1] = (*c)[1];
		line2[0] = (*c)[1];
		line2[1] = (*c)[2];
		float l1 = arcLength(line1, true);
		float l2 = arcLength(line1, true);

		if (l1>l2)
			r = l1 / l2;
		else
			r = l2 / l1;

		if (r<ratio_value)
			filtered.push_back(*c);
	}
	return filtered;
}



