package com.example.app;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {

    @Autowired
    private FeedbackRepository repo;

    @PostMapping("/submit")
    public Feedback submitFeedback(@RequestBody Feedback feedback) {
        String sentiment = callPythonScript(feedback.getText());
        feedback.setSentiment(sentiment);
        return repo.save(feedback);
    }

    @GetMapping("/feedback")
    public List<Feedback> getAllFeedback() {
        return repo.findAll();
    }

    private String callPythonScript(String inputText) {
        String sentiment = "unknown";
        try {
            ProcessBuilder pb = new ProcessBuilder("python3", "python/gemini_sentiment.py", inputText);
            pb.redirectErrorStream(true);
            Process process = pb.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            sentiment = reader.readLine().trim();
            process.waitFor();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return sentiment;
    }
}
