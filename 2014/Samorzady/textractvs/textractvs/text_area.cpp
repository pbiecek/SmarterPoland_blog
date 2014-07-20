#include "text_area.h"

void process_headers(std::vector<TextArea>& text_area, std::vector<std::string>* colNames)
{
	std::stack<int> traverse_stack;
	//std::vector< std::string >* colNames = new std::vector< std::string >;
	//std::map< int, int > coord_to_col_number;


	int* parents = new int[text_area.size()];
	for (unsigned int i = 0; i < text_area.size(); i++)
		parents[i] = -1;

	 int i = 0;
	int max_y_first_row = 0;
	while (i < text_area.size() && text_area[0].minimal.y == text_area[i].minimal.y)
	{
		max_y_first_row = std::max(max_y_first_row, text_area[i].maximal.y);
		++i;

	}
	--i;
	while (i >= 0)
	{
		traverse_stack.push(i);
		--i;
	}


	//cout << "Traverse_stack size " << traverse_stack.size() << endl;

	while (traverse_stack.empty() == false)
	{
		int i = traverse_stack.top();

		//cout << "Hello traversing " << i << " " << *text_area[i].text << endl;
		traverse_stack.pop();
		text_area[i].isHeader = true;


		unsigned int j = i + 1;
		while (j < text_area.size() && text_area[j].minimal.x != text_area[i].minimal.x)
		{
			++j;
		}

		//jakies sprawdzanie zakresu
		if (j >= text_area.size())
			continue;				//nie do konca, ale.... ta sytuacja nigdy nie powinna sie zdazyc

		unsigned int k = j;
		stack<int> to_push_on_stack_reversed;
		while (k < text_area.size() && text_area[k].minimal.y == text_area[j].minimal.y && text_area[k].minimal.x < text_area[i].maximal.x)
		{
			//cout << "   " << *text_area[k].text << " " << k;
			//bad heuristic
			//if (text_area[k].minimal.x == text_area[i].minimal.x && text_area[k].maximal.x == text_area[i].maximal.x) //lisc


			// if is leaf (last element in column)
			if (text_area[k].minimal.x == text_area[i].minimal.x && text_area[k].maximal.x == text_area[i].maximal.x && text_area[k].minimal.y >= max_y_first_row)
			{
				std::string n;	//name
				parents[k] = i;
				int p = parents[k];		//dont include this box
				while (p != -1)
				{
					if (n.size() > 0)
						n = text_area[p].text + ";" + n;
					else
						n = text_area[p].text;
					//std::cout << *text_area[p].text << " ";
					p = parents[p];
				}
				//std::cout << endl;
				for (unsigned int c = 0; c < n.size(); c++)
				if (n[c] == '\n')
					n[c] = ' ';
				//text_area[k].withHeaderText = n;
				if (colNames!=NULL)
					colNames->push_back(n);



				//coord_to_col_number.insert(std::pair<int, int>(text_area[k].minimal.x, colNames.size() - 1));
				//
			}
			else
			{
				parents[k] = i;
				to_push_on_stack_reversed.push(k);
			}
			++k;
		}
		while (to_push_on_stack_reversed.empty() == false)
		{
			traverse_stack.push(to_push_on_stack_reversed.top());
			to_push_on_stack_reversed.pop();
		}
	}


	//
	//if (columnNames != NULL)
	//	columnNames = colNames;

	delete[] parents;
}