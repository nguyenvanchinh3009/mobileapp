package com.example.hitcapp;

import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;
import java.util.List;

public class HomeActivity2 extends AppCompatActivity {

    private EditText edtSearch;
    private List<Pair> movieList;

    static class Pair {
        View view;
        String title;

        Pair(View view, String title) {
            this.view = view;
            this.title = title;
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home2);

        edtSearch = findViewById(R.id.edtSearch);

        View movie2 = findViewById(R.id.movie2);
        View movie3 = findViewById(R.id.movie3);
        View movie4 = findViewById(R.id.movie4);
        View movie5 = findViewById(R.id.movie5);

        movieList = new ArrayList<>();
        movieList.add(new Pair(movie2, "The Hobbit"));
        movieList.add(new Pair(movie3, "All Of Are Dead"));
        movieList.add(new Pair(movie4, "Hellsing: Ultimate"));
        movieList.add(new Pair(movie5, "The Last Of Us"));

        setupSearch();
    }

    private void setupSearch() {
        edtSearch.addTextChangedListener(new TextWatcher() {
            @Override
            public void afterTextChanged(Editable s) {
                String query = s.toString().trim().toLowerCase();

                for (Pair item : movieList) {
                    if (item.title.toLowerCase().contains(query)) {
                        item.view.setVisibility(View.VISIBLE);
                    } else {
                        item.view.setVisibility(View.GONE);
                    }
                }
            }

            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}
            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {}
        });
    }
}
